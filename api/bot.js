const axios = require('axios');

export default async function handler(req, res) {
  // Buradaki tırnak içine kendi Telegram Token'ını yapıştır
  const token = "8629686439:AAGyQzBfMENfEwIfWV9Ty07vPbfXo2IkPKw";
  
  if (req.method === 'POST') {
    const message = req.body.message;
    if (message && message.text === "/start") {
      try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
          chat_id: message.chat.id,
          text: "Selam! 1Win Bildirim Paneli şu an aktif ve siteye bağlı. Siteden gelen veriler buraya düşecek."
        });
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    }
    return res.status(200).json({ status: 'ok' });
  }
  return res.status(200).send("Bot API çalışıyor...");
}
