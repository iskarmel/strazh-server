const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const RANDORAN_URL = process.env.RANDORAN_URL || 'https://randoran.com';
const RANDORAN_APP_ID = process.env.RANDORAN_APP_ID || 'strazh';
const RANDORAN_SECRET = process.env.RANDORAN_SECRET || 'randoran_internal_secret_2026';
const FREE_CHECKS_PER_DAY = 5;

app.use(express.json({ limit: '50kb' }));
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../client')));

const freeLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: FREE_CHECKS_PER_DAY,
  keyGenerator: (req) => req.ip,
  skip: (req) => !!req.body.license_key,
  message: { error: 'limit_reached', message: `Бесплатный лимит: ${FREE_CHECKS_PER_DAY} проверок в день исчерпан.` }
});

async function validateLicense(licenseKey) {
  try {
    const url = `${RANDORAN_URL}/api/v1/licenses/validate?key=${licenseKey}&appId=${RANDORAN_APP_ID}`;
    const resp = await fetch(url, { headers: { 'x-internal-secret': RANDORAN_SECRET } });
    if (!resp.ok) return { valid: false, reason: 'Ключ не найден' };
    const data = await resp.json();
    return { valid: data.valid === true || data.status === 'active', reason: data.reason || null };
  } catch (err) {
    console.error('Randoran error:', err.message);
    return { valid: false, reason: 'Ошибка проверки лицензии' };
  }
}

app.post('/api/analyze', freeLimiter, async (req, res) => {
  const { type, content, license_key } = req.body;

  if (!content || content.length < 3) return res.status(400).json({ error: 'Нет содержимого для анализа' });
  if (content.length > 8000) return res.status(400).json({ error: 'Слишком большой объём. Максимум 8000 символов.' });
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Сервер не настроен.' });

  let isPremium = false;
  if (license_key) {
    const license = await validateLicense(license_key);
    if (!license.valid) {
      return res.status(403).json({ error: 'license_invalid', message: license.reason || 'Лицензионный ключ недействителен' });
    }
    isPremium = true;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: buildPrompt(type, content) }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'Ошибка AI-анализа. Попробуйте ещё раз.' });
    }

    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');
    const result = JSON.parse(text.replace(/```json|```/g, '').trim());
    console.log(`[${new Date().toISOString()}] verdict=${result.verdict} premium=${isPremium}`);
    res.json({ ...result, premium: isPremium });

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

app.post('/api/validate-license', async (req, res) => {
  const { license_key } = req.body;
  if (!license_key) return res.status(400).json({ valid: false });
  const result = await validateLicense(license_key);
  res.json(result);
});

app.get('/api/download-extension', (req, res) => {
  const extensionPath = path.join(__dirname, '../strazh-extension.zip');
  if (require('fs').existsSync(extensionPath)) {
    res.download(extensionPath, 'strazh-extension.zip');
  } else {
    res.status(404).json({ error: 'Файл расширения не найден на сервере' });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', version: '2.0.0', name: 'Страж API' });
});

app.listen(PORT, () => {
  console.log(`\n🛡  Страж v2.0 на порту ${PORT}`);
  console.log(`   Anthropic: ${ANTHROPIC_API_KEY ? '✅' : '❌'}`);
  console.log(`   Randoran: ${RANDORAN_URL} / ${RANDORAN_APP_ID}`);
});

function buildPrompt(type, content) {
  return `Ты — «Страж», эксперт по кибербезопасности. Анализируй ${type || 'контент'} и дай понятный вердикт для обычного пользователя.

Проанализируй:
${content}

Ответь СТРОГО в формате JSON (без markdown):
{
  "verdict": "safe" | "warning" | "danger",
  "risk_score": число от 1 до 10,
  "verdict_label": "Безопасно" | "Осторожно" | "ОПАСНО",
  "verdict_sub": "Краткое резюме в 1 предложение",
  "findings": [
    { "level": "safe"|"warning"|"danger", "title": "...", "description": "..." }
  ],
  "summary": "Итоговый вывод в 2-3 предложения",
  "recommendation": "install" | "careful" | "block"
}

Ищи в коде: обфускацию, подозрительные сетевые запросы, опасные права, автозапуск, typosquatting, prompt injection в MCP, невидимые символы.

Ищи в письмах (email):
- Несовпадение имени отправителя и домена (например, "Сбербанк" но домен sberbank-online.xyz)
- Поддельный Reply-To отличающийся от From
- Срочность и запугивание ("заблокируем аккаунт", "последнее предупреждение")
- Просьбы ввести пароль, данные карты, код из SMS
- Подозрительные ссылки (сокращённые URL, опечатки в доменах)
- Вложения с опасными расширениями замаскированными под документы
- Признаки массовой рассылки

Отвечай на русском.`;
}
