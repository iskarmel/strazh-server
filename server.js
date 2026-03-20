const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== НАСТРОЙКИ =====
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FREE_CHECKS_PER_IP = 5; // бесплатных проверок на пользователя

app.use(express.json({ limit: '50kb' }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));

// Отдаём фронтенд
const path = require('path');
app.use(express.static(path.join(__dirname, '../client')));

// Rate limiting — защита от спама
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: FREE_CHECKS_PER_IP,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'limit_reached',
    message: `Бесплатный лимит: ${FREE_CHECKS_PER_IP} проверок в час. Для неограниченного доступа — оформите подписку.`
  }
});

// ===== ГЛАВНЫЙ ENDPOINT — АНАЛИЗ =====
app.post('/api/analyze', limiter, async (req, res) => {
  const { type, content } = req.body;

  if (!content || content.length < 3) {
    return res.status(400).json({ error: 'Нет содержимого для анализа' });
  }

  if (content.length > 8000) {
    return res.status(400).json({ error: 'Слишком большой объём. Максимум 8000 символов.' });
  }

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Сервер не настроен. Свяжитесь с администратором.' });
  }

  const prompt = buildPrompt(type, content);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'Ошибка AI-анализа. Попробуйте ещё раз.' });
    }

    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    // Логируем (без персональных данных)
    console.log(`[${new Date().toISOString()}] verdict=${result.verdict} risk=${result.risk_score} type=${type}`);

    res.json(result);

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

// Проверить лимит — сколько осталось
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    name: 'Страж API'
  });
});

app.listen(PORT, () => {
  console.log(`\n🛡  Страж запущен на порту ${PORT}`);
  console.log(`   API ключ: ${ANTHROPIC_API_KEY ? '✅ задан' : '❌ НЕ ЗАДАН — установите ANTHROPIC_API_KEY'}`);
});

// ===== ПРОМПТ ДЛЯ CLAUDE =====
function buildPrompt(type, content) {
  return `Ты — «Страж», эксперт по кибербезопасности. Анализируй ${type || 'контент'} и дай понятный вердикт для обычного пользователя (не технаря).

Проанализируй:
${content}

Ответь СТРОГО в формате JSON (без markdown, без блоков кода, только чистый JSON):
{
  "verdict": "safe" | "warning" | "danger",
  "risk_score": число от 1 до 10,
  "verdict_label": "Безопасно" | "Осторожно" | "ОПАСНО",
  "verdict_sub": "Краткое резюме в 1 предложение",
  "findings": [
    {
      "level": "safe" | "warning" | "danger",
      "title": "Название проблемы или хорошего признака",
      "description": "Объяснение простым языком для нетехнического пользователя"
    }
  ],
  "summary": "Итоговый вывод в 2-3 предложения: стоит ли устанавливать и почему",
  "recommendation": "install" | "careful" | "block"
}

Что искать:
- Скрытый/обфусцированный код (base64, hex, eval, exec)
- Подозрительные сетевые запросы (отправка данных на внешние серверы)
- Запросы опасных прав (пароли, файлы, камера, микрофон)
- Команды автозапуска, изменение системы, реестра
- Typosquatting (имя похоже на известный пакет, но отличается)
- Для MCP-конфигов: prompt injection, скрытые инструкции для AI
- Невидимые символы (zero-width characters)
- Возраст/репутация аккаунта на GitHub

Отвечай на русском языке. Будь конкретен и понятен.`;
}
