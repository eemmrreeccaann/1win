const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || '0.0.0.0';
const BUILD_DIR = path.join(__dirname, 'build');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const EVENT_LABELS = {
  login: 'KULLANICI GİRİŞİ',
  register: 'YENİ KAYIT',
  deposit_request: 'PARA YÜKLEME TALEBİ',
  withdraw_request: 'PARA ÇEKME TALEBİ',
  logout: 'HESAPTAN ÇIKIŞ',
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 32) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .slice(0, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMessage(payload, req) {
  const event = EVENT_LABELS[payload.event] || 'BİLDİRİM';
  const user = payload.user || {};
  const details = payload.details || {};
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'Bilinmiyor';
  const userAgent = req.headers['user-agent'] || 'Bilinmiyor';
  const time = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

  const lines = [
    `🔔 <b>${escapeHtml(event)}</b>`,
    '',
    '<b>Kullanıcı</b>',
    `├ Kullanıcı: <code>${escapeHtml(user.username || 'Bilinmiyor')}</code>`,
    `├ Yöntem: <code>${escapeHtml(user.method || 'Bilinmiyor')}</code>`,
    `└ Durum: <code>${escapeHtml(user.status || 'Aktif')}</code>`,
    '',
    '<b>İşlem Detayı</b>',
  ];

  Object.entries(details).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      lines.push(`├ ${escapeHtml(key)}: <code>${escapeHtml(value)}</code>`);
    }
  });

  lines.push(
    '',
    '<b>Cihaz</b>',
    `├ IP: <code>${escapeHtml(ip)}</code>`,
    `└ Tarayıcı: <code>${escapeHtml(userAgent.slice(0, 120))}</code>`,
    '',
    `⏰ Tarih: <code>${escapeHtml(time)}</code>`,
  );

  return lines.join('\n');
}

async function notifyTelegram(payload, req) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram ayarları eksik');
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: formatMessage(payload, req),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.ok) {
    throw new Error(data?.description || 'Telegram mesajı gönderilemedi');
  }
}

async function handleNotify(req, res) {
  try {
    const rawBody = await readBody(req);
    const payload = JSON.parse(rawBody || '{}');

    if (!EVENT_LABELS[payload.event]) {
      return sendJson(res, 400, { ok: false, error: 'Geçersiz bildirim türü' });
    }

    await notifyTelegram(payload, req);
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Telegram notify error:', error.message);
    return sendJson(res, 500, { ok: false, error: 'Bildirim gönderilemedi' });
  }
}

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  const requestedPath = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.normalize(path.join(BUILD_DIR, requestedPath));

  if (!filePath.startsWith(BUILD_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    ? filePath
    : path.join(BUILD_DIR, 'index.html');
  const ext = path.extname(finalPath).toLowerCase();

  fs.readFile(finalPath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/notify') {
    handleNotify(req, res);
    return;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end('Method not allowed');
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});