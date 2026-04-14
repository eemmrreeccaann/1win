export default async function handler(req, res) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  if (req.method === 'GET') {
    return res.status(200).send('Bot aktif!');
  }

  if (req.method === 'POST') {
    const body = req.body;

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text || '';
      const user = body.message.from;

      let msg = '';

      if (text === '/start') {
        msg = `🎰 *1WIN'e Hoş Geldiniz!*\n\nMerhaba ${user.first_name || ''}!\n\n/para_yatir - Para yatırma\n/para_cek - Para çekme\n/destek - Canlı destek`;
      } else if (text === '/para_yatir') {
        msg = '💳 *Para Yatırma*\n\n🏦 IBAN: TR580012502003446155800351\n👤 Alıcı: Emre Can Ay\n\nDekontunuzu gönderin ✅';
      } else if (text === '/para_cek') {
        msg = '💸 *Para Çekme*\n\n1️⃣ IBAN\n2️⃣ Ad Soyad\n3️⃣ Tutar gönderin';
      } else if (text === '/destek') {
        msg = '📞 *7/24 Destek* - Mesajınızı yazın!';
      } else {
        msg = '✅ Mesajınız alındı!\n\nDestek ekibimiz yanıt verecek.';
      }

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' })
      });
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(405).send('Method not allowed');
}
