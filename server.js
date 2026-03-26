<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Страж — Агент Безопасности</title>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0a0f; --bg2: #111118; --bg3: #18181f;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.13);
    --text: #f0f0f5; --muted: #7a7a8c;
    --accent: #e84040; --green: #2ecc71; --yellow: #f39c12; --red: #e74c3c;
    --font-head: 'Unbounded', sans-serif; --font-body: 'Inter', sans-serif;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; }
  .noise { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); opacity: 0.4; }
  .glow-orb { position: fixed; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(232,64,64,0.07) 0%, transparent 70%); top: -200px; left: 50%; transform: translateX(-50%); pointer-events: none; z-index: 0; }
  .container { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; padding: 0 24px 80px; }

  header { display: flex; align-items: center; justify-content: space-between; padding: 28px 0 48px; border-bottom: 1px solid var(--border); margin-bottom: 48px; }
  .logo { display: flex; align-items: center; gap: 14px; }
  .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #e84040, #ff6b35); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .logo-text { font-family: var(--font-head); font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
  .logo-text span { color: var(--accent); }
  .badge { font-size: 11px; font-weight: 600; background: rgba(232,64,64,0.15); color: var(--accent); border: 1px solid rgba(232,64,64,0.3); padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase; }

  .hero { text-align: center; margin-bottom: 56px; }
  .hero h1 { font-family: var(--font-head); font-size: clamp(26px, 5vw, 44px); font-weight: 700; line-height: 1.15; letter-spacing: -1.5px; margin-bottom: 16px; }
  .hero h1 em { font-style: normal; background: linear-gradient(90deg, #e84040, #ff6b35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 480px; margin: 0 auto; }

  .stats-row { display: flex; gap: 16px; margin-bottom: 32px; }
  .stat-card { flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; text-align: center; }
  .stat-num { font-family: var(--font-head); font-size: 24px; font-weight: 700; }
  .stat-lbl { font-size: 12px; color: var(--muted); margin-top: 4px; }

  /* ЛИМИТ БАННЕР */
  .limit-banner { background: var(--bg2); border: 1px solid rgba(243,156,18,0.3); border-radius: 14px; padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
  .limit-bar-wrap { flex: 1; }
  .limit-bar-label { font-size: 12px; color: var(--muted); margin-bottom: 7px; display: flex; justify-content: space-between; }
  .limit-bar-track { height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
  .limit-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--green), var(--yellow)); transition: width 0.4s; }

  .input-card { background: var(--bg2); border: 1px solid var(--border2); border-radius: 20px; padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden; }
  .input-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(232,64,64,0.5), transparent); }
  .input-label { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .tabs { display: flex; gap: 8px; margin-bottom: 20px; }
  .tab { padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid var(--border2); background: transparent; color: var(--muted); cursor: pointer; transition: all 0.2s; font-family: var(--font-body); }
  .tab:hover { color: var(--text); }
  .tab.active { background: rgba(232,64,64,0.12); border-color: rgba(232,64,64,0.4); color: var(--accent); }
  .input-wrap { position: relative; display: flex; gap: 12px; align-items: flex-end; }
  textarea, input[type="text"] { width: 100%; background: var(--bg3); border: 1px solid var(--border2); border-radius: 12px; color: var(--text); font-family: var(--font-body); font-size: 14px; line-height: 1.6; padding: 14px 16px; resize: none; outline: none; transition: border-color 0.2s; }
  textarea:focus, input[type="text"]:focus { border-color: rgba(232,64,64,0.5); }
  textarea { min-height: 100px; }
  input[type="text"] { height: 52px; }
  .analyze-btn { height: 52px; padding: 0 28px; background: linear-gradient(135deg, #e84040, #c0392b); border: none; border-radius: 12px; color: white; font-family: var(--font-head); font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s; letter-spacing: 0.3px; flex-shrink: 0; }
  .analyze-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
  .analyze-btn:active { transform: translateY(0); }
  .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .drop-zone { border: 2px dashed var(--border2); border-radius: 12px; padding: 36px; text-align: center; cursor: pointer; transition: all 0.2s; color: var(--muted); font-size: 14px; }
  .drop-zone:hover, .drop-zone.drag-over { border-color: rgba(232,64,64,0.4); background: rgba(232,64,64,0.04); color: var(--text); }
  .drop-icon { font-size: 32px; margin-bottom: 10px; }
  .drop-zone input { display: none; }

  .examples-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; margin-top: 16px; }
  .example-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.2s; }
  .example-card:hover { border-color: rgba(232,64,64,0.3); }
  .ex-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--muted); margin-bottom: 7px; }
  .ex-val { font-size: 12px; color: var(--text); font-family: monospace; line-height: 1.5; word-break: break-all; }

  .result-card { background: var(--bg2); border: 1px solid var(--border2); border-radius: 20px; overflow: hidden; margin-bottom: 24px; display: none; animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .result-header { padding: 24px 28px; display: flex; align-items: center; gap: 20px; border-bottom: 1px solid var(--border); }
  .verdict-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
  .verdict-icon.safe { background: rgba(46,204,113,0.15); }
  .verdict-icon.warning { background: rgba(243,156,18,0.15); }
  .verdict-icon.danger { background: rgba(231,76,60,0.15); }
  .verdict-label { font-family: var(--font-head); font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
  .verdict-label.safe { color: var(--green); }
  .verdict-label.warning { color: var(--yellow); }
  .verdict-label.danger { color: var(--red); }
  .verdict-sub { font-size: 13px; color: var(--muted); }
  .risk-meter { margin-left: auto; text-align: center; flex-shrink: 0; }
  .risk-circle { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 18px; font-weight: 700; border: 3px solid; flex-direction: column; }
  .risk-circle.safe { border-color: var(--green); color: var(--green); }
  .risk-circle.warning { border-color: var(--yellow); color: var(--yellow); }
  .risk-circle.danger { border-color: var(--red); color: var(--red); }
  .risk-label { font-size: 10px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
  .result-body { padding: 24px 28px; }
  .section-title { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .findings { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
  .finding { display: flex; align-items: flex-start; gap: 12px; background: var(--bg3); border-radius: 10px; padding: 14px 16px; font-size: 14px; line-height: 1.6; border-left: 3px solid; }
  .finding.safe { border-color: var(--green); }
  .finding.warning { border-color: var(--yellow); }
  .finding.danger { border-color: var(--red); }
  .finding-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .finding-text { color: var(--text); }
  .finding-text strong { display: block; font-weight: 600; margin-bottom: 2px; }
  .finding-text span { color: var(--muted); font-size: 13px; }
  .verdict-summary { background: var(--bg3); border-radius: 12px; padding: 18px 20px; font-size: 14px; line-height: 1.7; color: var(--text); margin-bottom: 20px; border: 1px solid var(--border); }
  .action-btns { display: flex; gap: 10px; }
  .btn-secondary { padding: 10px 20px; background: var(--bg3); border: 1px solid var(--border2); border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .btn-danger { padding: 10px 20px; background: rgba(231,76,60,0.12); border: 1px solid rgba(231,76,60,0.3); border-radius: 10px; color: var(--red); font-family: var(--font-body); font-size: 13px; font-weight: 500; cursor: pointer; }
  .btn-success { padding: 10px 20px; background: rgba(46,204,113,0.12); border: 1px solid rgba(46,204,113,0.3); border-radius: 10px; color: var(--green); font-family: var(--font-body); font-size: 13px; font-weight: 500; cursor: pointer; }

  .loading-card { background: var(--bg2); border: 1px solid var(--border2); border-radius: 20px; padding: 48px; text-align: center; display: none; animation: fadeIn 0.3s ease; }
  .loading-spinner { width: 52px; height: 52px; border: 3px solid var(--border2); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-family: var(--font-head); font-size: 16px; font-weight: 600; margin-bottom: 8px; }
  .loading-sub { font-size: 13px; color: var(--muted); }
  .loading-steps { display: flex; gap: 8px; justify-content: center; margin-top: 24px; flex-wrap: wrap; }
  .step-pill { font-size: 12px; padding: 5px 12px; border-radius: 20px; border: 1px solid var(--border); color: var(--muted); transition: all 0.4s; }
  .step-pill.active { border-color: rgba(232,64,64,0.4); color: var(--accent); background: rgba(232,64,64,0.08); }
  .step-pill.done { border-color: rgba(46,204,113,0.3); color: var(--green); background: rgba(46,204,113,0.07); }

  /* БЛОК ЛИМИТА ИСЧЕРПАН */
  .limit-wall { background: var(--bg2); border: 1px solid rgba(232,64,64,0.3); border-radius: 20px; padding: 40px; text-align: center; display: none; }
  .limit-wall h2 { font-family: var(--font-head); font-size: 20px; margin-bottom: 12px; }
  .limit-wall p { color: var(--muted); font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
  .btn-primary { display: inline-block; padding: 13px 32px; background: linear-gradient(135deg, #e84040, #c0392b); border: none; border-radius: 12px; color: white; font-family: var(--font-head); font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; }

  .history { margin-top: 36px; }
  .history-title { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .history-item { display: flex; align-items: center; gap: 14px; padding: 12px 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 8px; font-size: 13px; }
  .h-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .h-dot.safe { background: var(--green); } .h-dot.warning { background: var(--yellow); } .h-dot.danger { background: var(--red); }
  .h-url { flex: 1; color: var(--text); font-family: monospace; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .h-time { color: var(--muted); font-size: 12px; flex-shrink: 0; }

  footer { text-align: center; color: var(--muted); font-size: 12px; padding-top: 36px; border-top: 1px solid var(--border); margin-top: 48px; }
  @media (max-width: 600px) { .stats-row { flex-wrap: wrap; } .input-wrap { flex-direction: column; } .analyze-btn { width: 100%; height: 48px; } }
</style>
</head>
<body>

<div id="consentModal" style="display:none;position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:24px;">
  <div style="background:#111118;border:1px solid rgba(255,255,255,0.13);border-radius:20px;max-width:480px;width:100%;padding:32px;position:relative;">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      <div style="width:42px;height:42px;background:linear-gradient(135deg,#e84040,#ff6b35);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🛡</div>
      <div style="font-family:var(--font-head);font-size:18px;font-weight:700;">Добро пожаловать в <span style="color:#e84040">Страж</span></div>
    </div>
    <p style="font-size:14px;color:#c0c0cc;line-height:1.7;margin-bottom:20px;">Перед использованием сервиса, пожалуйста, ознакомьтесь с важной информацией:</p>
    <div style="background:#18181f;border-radius:12px;padding:16px;margin-bottom:20px;font-size:13px;color:#a0a0b0;line-height:1.8;">
      <div style="margin-bottom:8px;">⚠️ <strong style="color:#f0f0f5;">Страж — вспомогательный инструмент,</strong> а не замена антивирусу</div>
      <div style="margin-bottom:8px;">🤖 Анализ выполняет ИИ и <strong style="color:#f0f0f5;">не гарантирует</strong> 100% обнаружение угроз</div>
      <div style="margin-bottom:8px;">👤 <strong style="color:#f0f0f5;">Решение об установке</strong> программ всегда принимаете вы</div>
      <div>🔒 Содержимое проверок <strong style="color:#f0f0f5;">не сохраняется</strong> на сервере</div>
    </div>
    <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;margin-bottom:20px;">
      <input type="checkbox" id="consentCheck" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;accent-color:#e84040;" />
      <span style="font-size:13px;color:#c0c0cc;line-height:1.6;">Я прочитал и принимаю <a href="terms.html" target="_blank" style="color:#e84040;">Пользовательское соглашение</a> и <a href="privacy.html" target="_blank" style="color:#e84040;">Политику конфиденциальности</a></span>
    </label>
    <button id="consentBtn" onclick="acceptConsent()" style="width:100%;padding:13px;background:linear-gradient(135deg,#e84040,#c0392b);border:none;border-radius:12px;color:white;font-family:var(--font-head);font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;">
      Начать использование →
    </button>
  </div>
</div>

<div class="noise"></div>
<div class="glow-orb"></div>
<div class="container">

  <header>
    <div class="logo">
      <div class="logo-icon">🛡</div>
      <div class="logo-text">СТРА<span>Ж</span></div>
    </div>
    <div class="badge">Beta v1.0</div>
  </header>

  <div class="hero">
    <h1>Твой личный<br><em>Страж безопасности</em></h1>
    <p>Проверяй ссылки, код и файлы перед установкой. Страж найдёт скрытые угрозы и объяснит простым языком — бесплатно.</p>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-num" id="stat-total">0</div>
      <div class="stat-lbl">Проверено</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="color:var(--red)" id="stat-danger">0</div>
      <div class="stat-lbl">Опасных</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="color:var(--yellow)" id="stat-warning">0</div>
      <div class="stat-lbl">Подозрительных</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="color:var(--green)" id="stat-safe">0</div>
      <div class="stat-lbl">Безопасных</div>
    </div>
  </div>

  <!-- БЛОК ЛИЦЕНЗИИ -->
  <div class="input-card" id="licenseCard" style="margin-bottom:16px;padding:20px 28px;">
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <div style="font-size:20px">🔑</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;margin-bottom:4px;">Лицензионный ключ</div>
        <div style="font-size:12px;color:var(--muted)">Введи ключ для безлимитного доступа</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <input type="text" id="licenseInput" placeholder="STRAZH-XXXX-XXXX-XXXX" style="height:40px;width:220px;font-size:13px;" />
        <button onclick="activateLicense()" style="height:40px;padding:0 18px;background:rgba(232,64,64,0.12);border:1px solid rgba(232,64,64,0.3);border-radius:10px;color:var(--accent);font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;">Активировать</button>
        <span id="licenseStatus" style="font-size:12px;display:none;"></span>
      </div>
    </div>
  </div>

  <!-- Индикатор лимита -->
  <div class="limit-banner" id="limitBanner">
    <div style="font-size:22px">🎁</div>
    <div class="limit-bar-wrap">
      <div class="limit-bar-label">
        <span>Бесплатных проверок</span>
        <span id="limitText">5 из 5 осталось</span>
      </div>
      <div class="limit-bar-track">
        <div class="limit-bar-fill" id="limitBar" style="width:100%"></div>
      </div>
    </div>
  </div>

  <div class="input-card">
    <div class="input-label">Что проверить?</div>
    <div class="tabs">
      <button class="tab active" onclick="switchTab('url')">🔗 Ссылка / URL</button>
      <button class="tab" onclick="switchTab('code')">📄 Код / Скрипт</button>
      <button class="tab" onclick="switchTab('file')">📁 Файл</button>
      <button class="tab" onclick="switchTab('email')">📧 Письмо</button>
    </div>

    <div id="tab-url">
      <div class="input-wrap">
        <input type="text" id="urlInput" placeholder="https://github.com/user/repo  или  pip install пакет  или  npm install пакет" />
        <button class="analyze-btn" onclick="analyze()">Проверить →</button>
      </div>
      <div class="examples-grid">
        <div class="example-card" onclick="fillExample('https://github.com/microsoft/vscode')">
          <div class="ex-label">✅ Безопасный</div>
          <div class="ex-val">github.com/microsoft/vscode</div>
        </div>
        <div class="example-card" onclick="fillExample('pip install crypt0-wallet-stealer')">
          <div class="ex-label">🚫 Опасный</div>
          <div class="ex-val">pip install crypt0-wallet-stealer</div>
        </div>
        <div class="example-card" onclick="fillExample('https://github.com/new-user-2024x/mcp-claude-helper')">
          <div class="ex-label">⚠️ Подозрительный</div>
          <div class="ex-val">github.com/new-user-2024x/mcp-helper</div>
        </div>
      </div>
    </div>

    <div id="tab-code" style="display:none">
      <div style="display:flex;flex-direction:column;gap:10px">
        <textarea id="codeInput" placeholder="Вставь сюда код, скрипт, MCP-конфиг или содержимое файла...&#10;&#10;Поддерживается: Python, JavaScript, Shell, JSON, YAML и любой другой текст."></textarea>
        <button class="analyze-btn" onclick="analyzeCode()" style="align-self:flex-end;height:44px">Проверить →</button>
      </div>
    </div>

    <div id="tab-file" style="display:none">
      <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)">
        <input type="file" id="fileInput" onchange="handleFileSelect(event)" accept=".py,.js,.sh,.json,.yaml,.yml,.txt,.md,.bat,.ps1,.php,.rb,.go,.rs" />
        <div class="drop-icon">📂</div>
        <div>Перетащи файл сюда или нажми для выбора</div>
        <div style="font-size:12px;color:var(--muted);margin-top:8px">.py .js .sh .json .yaml .bat .ps1 и другие текстовые файлы</div>
      </div>
    </div>

    <div id="tab-email" style="display:none">
      <div class="drop-zone" id="emailDropZone" onclick="document.getElementById('emailInput').click()" ondragover="handleEmailDragOver(event)" ondragleave="handleEmailDragLeave(event)" ondrop="handleEmailDrop(event)">
        <input type="file" id="emailInput" onchange="handleEmailSelect(event)" accept=".eml,.msg" />
        <div class="drop-icon">📧</div>
        <div style="font-size:15px;font-weight:500;margin-bottom:8px">Перетащи письмо сюда</div>
        <div style="font-size:13px;color:var(--muted);margin-bottom:16px">Поддерживаются файлы .eml и .msg</div>
        <div style="font-size:12px;color:var(--muted);background:var(--bg3);border-radius:8px;padding:12px 16px;text-align:left;line-height:1.9">
          💡 <strong style="color:var(--text)">Как сохранить письмо:</strong><br>
          • <strong>Gmail:</strong> открой письмо → ⋮ (три точки) → "Скачать сообщение" → получишь .eml<br>
          • <strong>Outlook:</strong> Файл → Сохранить как → выбери формат .msg<br>
          • <strong>Apple Mail:</strong> перетащи письмо прямо из почты в это окно
        </div>
      </div>
    </div>
  </div>

  <div class="loading-card" id="loadingCard">
    <div class="loading-spinner"></div>
    <div class="loading-text">Страж анализирует...</div>
    <div class="loading-sub">Это займёт 10–20 секунд</div>
    <div class="loading-steps">
      <span class="step-pill active" id="step1">🔍 Сканирование</span>
      <span class="step-pill" id="step2">🧬 Анализ кода</span>
      <span class="step-pill" id="step3">🌐 Проверка источника</span>
      <span class="step-pill" id="step4">⚖️ Вердикт</span>
    </div>
  </div>

  <!-- Стена лимита -->
  <div class="limit-wall" id="limitWall">
    <div style="font-size:48px;margin-bottom:16px">🛡</div>
    <h2>Бесплатные проверки исчерпаны</h2>
    <p>Ты использовал все бесплатные проверки на сегодня.<br>Оформи подписку для неограниченного доступа.</p>
    <a href="#" class="btn-primary">Получить полный доступ →</a>
    <div style="margin-top:16px;font-size:12px;color:var(--muted)">или приходи завтра — лимит обновится автоматически</div>
  </div>

  <div class="result-card" id="resultCard">
    <div class="result-header">
      <div class="verdict-icon" id="verdictIcon">🛡</div>
      <div>
        <div class="verdict-label" id="verdictLabel">Безопасно</div>
        <div class="verdict-sub" id="verdictSub">Угроз не обнаружено</div>
      </div>
      <div class="risk-meter">
        <div class="risk-circle" id="riskCircle"><span id="riskNum">2</span></div>
        <div class="risk-label">Риск / 10</div>
      </div>
    </div>
    <div class="result-body">
      <div class="section-title">Что нашёл Страж</div>
      <div class="findings" id="findings"></div>
      <div class="section-title">Итоговый вывод</div>
      <div class="verdict-summary" id="verdictSummary"></div>
      <div class="action-btns" id="actionBtns"></div>
    </div>
  </div>

  <!-- БЛОК РАСШИРЕНИЯ — показывается только с ключом -->
  <div id="extensionBlock" style="display:none;margin-bottom:32px;">
    <div class="input-card" style="padding:24px 28px;">
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <div style="font-size:36px">🧩</div>
        <div style="flex:1">
          <div style="font-family:var(--font-head);font-size:16px;font-weight:700;margin-bottom:5px;">Расширение для Gmail</div>
          <div style="font-size:13px;color:var(--muted);line-height:1.6;">Кнопка "Проверить в Страже" прямо в каждом письме.<br>Доступно только подписчикам.</div>
        </div>
        <button onclick="downloadExtension()" style="padding:12px 24px;background:linear-gradient(135deg,#e84040,#c0392b);border:none;border-radius:12px;color:white;font-family:var(--font-head);font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;">
          ⬇ Скачать расширение
        </button>
      </div>
      <div style="margin-top:16px;background:var(--bg3);border-radius:10px;padding:14px 16px;font-size:12px;color:var(--muted);line-height:1.9;" id="installInstructions" style="display:none">
        <strong style="color:var(--text)">Как установить за 3 шага:</strong><br>
        1. Распакуй скачанный ZIP в любую папку<br>
        2. Открой Chrome → адресная строка → <code style="background:var(--bg2);padding:1px 5px;border-radius:4px;">chrome://extensions</code><br>
        3. Включи <strong style="color:var(--text)">"Режим разработчика"</strong> (справа вверху) → нажми <strong style="color:var(--text)">"Загрузить распакованное"</strong> → выбери папку
      </div>
    </div>
  </div>

  <div class="history" id="historySection" style="display:none">
    <div class="history-title">История проверок</div>
    <div id="historyList"></div>
  </div>

  <footer>
    Страж v1.0 Beta — Агент безопасности на базе Claude AI<br>
    <span style="margin-top:6px;display:block">Страж — помощник, а не замена антивирусу. Всегда проверяй важные файлы дополнительно.</span>
    <div style="margin-top:12px;display:flex;gap:16px;justify-content:center;">
      <a href="terms.html" style="color:#e84040;font-size:12px;text-decoration:none;">Пользовательское соглашение</a>
      <span style="color:#555">·</span>
      <a href="privacy.html" style="color:#e84040;font-size:12px;text-decoration:none;">Политика конфиденциальности</a>
    </div>
  </footer>
</div>

<script>
// ⬇️ ЗАМЕНИ НА URL СВОЕГО СЕРВЕРА ПОСЛЕ ДЕПЛОЯ
const API_URL = 'https://strazh-server.onrender.com';

const FREE_LIMIT = 5;
let stats = JSON.parse(localStorage.getItem('strazh_stats') || '{"total":0,"danger":0,"warning":0,"safe":0}');
let history = JSON.parse(localStorage.getItem('strazh_history') || '[]');
let checksUsed = parseInt(localStorage.getItem('strazh_checks_used') || '0');
let checksResetDate = localStorage.getItem('strazh_reset_date') || '';

function init() {
  // Сброс лимита раз в сутки
  const today = new Date().toDateString();
  if (checksResetDate !== today) {
    checksUsed = 0;
    localStorage.setItem('strazh_checks_used', '0');
    localStorage.setItem('strazh_reset_date', today);
  }
  updateStats();
  updateLimitBar();
  renderHistory();
}

function updateLimitBar() {
  const left = Math.max(0, FREE_LIMIT - checksUsed);
  const pct = (left / FREE_LIMIT) * 100;
  document.getElementById('limitBar').style.width = pct + '%';
  document.getElementById('limitText').textContent = left + ' из ' + FREE_LIMIT + ' осталось';
  document.getElementById('limitBar').style.background = left <= 1
    ? 'var(--red)'
    : left <= 2
      ? 'var(--yellow)'
      : 'linear-gradient(90deg, var(--green), var(--yellow))';
}

function updateStats() {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-danger').textContent = stats.danger;
  document.getElementById('stat-warning').textContent = stats.warning;
  document.getElementById('stat-safe').textContent = stats.safe;
}

function checkLimit() {
  if (checksUsed >= FREE_LIMIT) {
    document.getElementById('limitWall').style.display = 'block';
    document.getElementById('limitWall').scrollIntoView({ behavior: 'smooth' });
    return false;
  }
  return true;
}

function switchTab(tab) {
  ['url','code','file','email'].forEach(t => {
    document.getElementById('tab-' + t).style.display = t === tab ? 'block' : 'none';
  });
  document.querySelectorAll('.tab').forEach((btn, i) => {
    btn.classList.toggle('active', ['url','code','file','email'][i] === tab);
  });
}

function fillExample(val) {
  document.getElementById('urlInput').value = val;
}

function showLoading() {
  document.getElementById('loadingCard').style.display = 'block';
  document.getElementById('resultCard').style.display = 'none';
  document.getElementById('limitWall').style.display = 'none';
  const steps = ['step1','step2','step3','step4'];
  let i = 0;
  steps.forEach(s => { document.getElementById(s).className = 'step-pill'; });
  document.getElementById('step1').classList.add('active');
  const iv = setInterval(() => {
    if (i < steps.length - 1) {
      document.getElementById(steps[i]).classList.remove('active');
      document.getElementById(steps[i]).classList.add('done');
      i++;
      document.getElementById(steps[i]).classList.add('active');
    }
  }, 1800);
  return iv;
}

function hideLoading() {
  document.getElementById('loadingCard').style.display = 'none';
}

function getOwnerToken() {
  return localStorage.getItem('strazh_owner') || '';
}

async function callAPI(type, content) {
  const license_key = getLicenseKey();
  const ownerToken = getOwnerToken();
  const resp = await fetch(API_URL + '/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(ownerToken ? { 'x-owner-token': ownerToken } : {})
    },
    body: JSON.stringify({ type, content, ...(license_key ? { license_key } : {}) })
  });
  if (resp.status === 429) {
    const data = await resp.json();
    throw new Error(data.message || 'Лимит проверок исчерпан');
  }
  if (!resp.ok) {
    const data = await resp.json();
    throw new Error(data.error || 'Ошибка сервера');
  }
  return await resp.json();
}

function showResult(result, target) {
  const icons = { safe: '✅', warning: '⚠️', danger: '🚫' };
  const emojiMap = { safe: '✅', warning: '⚡', danger: '🚫' };
  document.getElementById('verdictIcon').innerHTML = icons[result.verdict] || '🛡';
  document.getElementById('verdictIcon').className = 'verdict-icon ' + result.verdict;
  document.getElementById('verdictLabel').textContent = result.verdict_label;
  document.getElementById('verdictLabel').className = 'verdict-label ' + result.verdict;
  document.getElementById('verdictSub').textContent = result.verdict_sub;
  const rc = document.getElementById('riskCircle');
  rc.className = 'risk-circle ' + result.verdict;
  document.getElementById('riskNum').textContent = result.risk_score;
  document.getElementById('findings').innerHTML = (result.findings || []).map(f => `
    <div class="finding ${f.level}">
      <div class="finding-icon">${emojiMap[f.level] || '•'}</div>
      <div class="finding-text"><strong>${f.title}</strong><span>${f.description}</span></div>
    </div>
  `).join('');
  document.getElementById('verdictSummary').textContent = result.summary;
  const btns = document.getElementById('actionBtns');
  if (result.recommendation === 'install') {
    btns.innerHTML = `<button class="btn-success">✅ Можно устанавливать</button><button class="btn-secondary" onclick="document.getElementById('resultCard').style.display='none'">Закрыть</button>`;
  } else if (result.recommendation === 'careful') {
    btns.innerHTML = `<button class="btn-secondary" style="border-color:rgba(243,156,18,0.4);color:var(--yellow)">⚠️ Устанавливать осторожно</button><button class="btn-secondary" onclick="document.getElementById('resultCard').style.display='none'">Закрыть</button>`;
  } else {
    btns.innerHTML = `<button class="btn-danger">🚫 Не устанавливать!</button><button class="btn-secondary" onclick="document.getElementById('resultCard').style.display='none'">Закрыть</button>`;
  }
  document.getElementById('resultCard').style.display = 'block';
  document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  checksUsed++;
  localStorage.setItem('strazh_checks_used', checksUsed);
  stats.total++; stats[result.verdict]++;
  localStorage.setItem('strazh_stats', JSON.stringify(stats));
  updateStats(); updateLimitBar();
  history.unshift({ verdict: result.verdict, target: target.substring(0, 60), time: new Date().toLocaleTimeString('ru') });
  if (history.length > 20) history.pop();
  localStorage.setItem('strazh_history', JSON.stringify(history));
  renderHistory();
}

async function analyze() {
  if (!checkLimit()) return;
  const url = document.getElementById('urlInput').value.trim();
  if (!url) { alert('Введите ссылку или команду для проверки'); return; }
  const btn = document.querySelector('#tab-url .analyze-btn');
  btn.disabled = true;
  const iv = showLoading();
  try {
    const result = await callAPI('ссылку/команду', url);
    clearInterval(iv); hideLoading();
    showResult(result, url);
  } catch(e) {
    clearInterval(iv); hideLoading();
    alert('Ошибка: ' + e.message);
  }
  btn.disabled = false;
}

async function analyzeCode() {
  if (!checkLimit()) return;
  const code = document.getElementById('codeInput').value.trim();
  if (!code) { alert('Вставьте код для проверки'); return; }
  const btn = document.querySelector('#tab-code .analyze-btn');
  btn.disabled = true;
  const iv = showLoading();
  try {
    const result = await callAPI('код/скрипт', code.substring(0, 3000));
    clearInterval(iv); hideLoading();
    showResult(result, 'Код (' + code.length + ' символов)');
  } catch(e) {
    clearInterval(iv); hideLoading();
    alert('Ошибка: ' + e.message);
  }
  btn.disabled = false;
}

function handleDragOver(e) { e.preventDefault(); document.getElementById('dropZone').classList.add('drag-over'); }
function handleDragLeave() { document.getElementById('dropZone').classList.remove('drag-over'); }
function handleDrop(e) { e.preventDefault(); document.getElementById('dropZone').classList.remove('drag-over'); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }
function handleFileSelect(e) { if (e.target.files[0]) processFile(e.target.files[0]); }

function processFile(file) {
  if (!checkLimit()) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const iv = showLoading();
    try {
      const result = await callAPI('файл "' + file.name + '"', e.target.result.substring(0, 3000));
      clearInterval(iv); hideLoading();
      showResult(result, file.name);
    } catch(err) {
      clearInterval(iv); hideLoading();
      alert('Ошибка: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function handleEmailDragOver(e) { e.preventDefault(); document.getElementById('emailDropZone').classList.add('drag-over'); }
function handleEmailDragLeave() { document.getElementById('emailDropZone').classList.remove('drag-over'); }
function handleEmailDrop(e) { e.preventDefault(); document.getElementById('emailDropZone').classList.remove('drag-over'); if (e.dataTransfer.files[0]) processEmail(e.dataTransfer.files[0]); }
function handleEmailSelect(e) { if (e.target.files[0]) processEmail(e.target.files[0]); }

function parseEml(raw) {
  const lines = raw.split(/\r?\n/);
  let headers = {}, body = '', inBody = false, inBase64 = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inBody && line.trim() === '') { inBody = true; continue; }
    if (!inBody) {
      const m = line.match(/^([\w-]+):\s*(.*)$/i);
      if (m) headers[m[1].toLowerCase()] = m[2];
    } else {
      body += line + '\n';
    }
  }
  return { headers, body: body.substring(0, 3000) };
}

function processEmail(file) {
  if (!checkLimit()) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const raw = e.target.result;
    const { headers, body } = parseEml(raw);
    const summary = `От: ${headers['from'] || 'неизвестно'}
Кому: ${headers['to'] || 'неизвестно'}
Тема: ${headers['subject'] || 'без темы'}
Reply-To: ${headers['reply-to'] || 'не указан'}
Return-Path: ${headers['return-path'] || 'не указан'}
Received: ${headers['received'] || 'не указан'}

Текст письма:
${body}`;
    const iv = showLoading();
    try {
      const license_key = getLicenseKey();
      const resp = await fetch(API_URL + '/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'электронное письмо (email)', content: summary, ...(license_key ? { license_key } : {}) })
      });
      if (resp.status === 429) { clearInterval(iv); hideLoading(); document.getElementById('limitWall').style.display = 'block'; return; }
      const result = await resp.json();
      clearInterval(iv); hideLoading();
      showResult(result, headers['subject'] || file.name);
    } catch(err) {
      clearInterval(iv); hideLoading();
      alert('Ошибка: ' + err.message);
    }
  };
  reader.readAsText(file, 'utf-8');
}

function renderHistory() {
  const section = document.getElementById('historySection');
  if (!history.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  document.getElementById('historyList').innerHTML = history.slice(0,8).map(h => `
    <div class="history-item">
      <div class="h-dot ${h.verdict}"></div>
      <div class="h-url">${h.target}</div>
      <div class="h-time">${h.time}</div>
    </div>
  `).join('');
}

document.getElementById('urlInput').addEventListener('keydown', e => { if (e.key === 'Enter') analyze(); });

document.getElementById('consentCheck').addEventListener('change', function() {
  const btn = document.getElementById('consentBtn');
  if (this.checked) {
    btn.disabled = false;
    btn.style.background = 'linear-gradient(135deg,#e84040,#c0392b)';
    btn.style.color = 'white';
    btn.style.cursor = 'pointer';
  } else {
    btn.disabled = true;
    btn.style.background = 'rgba(232,64,64,0.3)';
    btn.style.color = '#888';
    btn.style.cursor = 'not-allowed';
  }
});

function acceptConsent() {
  localStorage.setItem('strazh_consent', '1');
  document.getElementById('consentModal').style.display = 'none';
}

function checkConsent() {
  const consent = localStorage.getItem('strazh_consent');
  if (!consent) {
    document.getElementById('consentModal').style.display = 'flex';
  }
}

// ===== ЛИЦЕНЗИЯ =====
let activeLicense = localStorage.getItem('strazh_license') || '';

async function activateLicense() {
  const key = document.getElementById('licenseInput').value.trim();
  if (!key) { alert('Введите лицензионный ключ'); return; }
  const status = document.getElementById('licenseStatus');
  status.style.display = 'inline';
  status.style.color = 'var(--muted)';
  status.textContent = 'Проверяю...';
  try {
    const resp = await fetch(API_URL + '/api/validate-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license_key: key })
    });
    const data = await resp.json();
    if (data.valid) {
      activeLicense = key;
      localStorage.setItem('strazh_license', key);
      status.style.color = 'var(--green)';
      status.textContent = '✅ Активирован!';
      document.getElementById('limitBanner').style.display = 'none';
      document.getElementById('limitWall').style.display = 'none';
      document.getElementById('extensionBlock').style.display = 'block';
    } else {
      status.style.color = 'var(--red)';
      status.textContent = '❌ ' + (data.reason || 'Ключ недействителен');
    }
  } catch(e) {
    status.style.color = 'var(--red)';
    status.textContent = '❌ Ошибка проверки';
  }
}

// Секретная активация владельца — введи email в консоли браузера:
// activateOwner('твой@email.com')
function activateOwner(email) {
  localStorage.setItem('strazh_owner', email);
  document.getElementById('limitBanner').style.display = 'none';
  document.getElementById('extensionBlock').style.display = 'block';
  console.log('Владелец активирован:', email);
  alert('Владелец активирован! Безлимитный доступ включён.');
}
window.activateOwner = activateOwner;

// Проверяем при загрузке
if (getOwnerToken()) {
  document.getElementById('limitBanner').style.display = 'none';
}

function downloadExtension() {
  document.getElementById('installInstructions').style.display = 'block';
  window.open(API_URL + '/api/download-extension', '_blank');
}

function getLicenseKey() {
  return activeLicense || localStorage.getItem('strazh_license') || '';
}

if (activeLicense) {
  document.getElementById('licenseInput').value = activeLicense;
  document.getElementById('extensionBlock').style.display = 'block';
  const status = document.getElementById('licenseStatus');
  status.style.display = 'inline';
  status.style.color = 'var(--green)';
  status.textContent = '✅ Активен';
  document.getElementById('limitBanner').style.display = 'none';
}

checkConsent();
init();;
</script>
</body>
</html>
