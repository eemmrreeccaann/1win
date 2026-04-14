const axios = require('axios');

export default async function handler(req, res) {
    const token = "8151528657:AAH01eW3i0oVq_S62jL3o9oW2v_9y2o9o"; // Senin bot tokenın
    const myChatId = "6760722119"; // Senin kişisel ID numaran

    if (req.method === 'POST') {
        const { message } = req.body;
        
        // Eğer birisi butona bastıysa ve veri geldiyse
        const text = message && message.text ? message.text : "⚠️ Bildirim: Sitede butona basıldı!";

        try {
            await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: myChatId,
                text: text,
                parse_mode: 'Markdown'
            });
            res.status(200).send('Mesaj gönderildi!');
        } catch (error) {
            res.status(500).send('Hata oluştu: ' + error.message);
        }
    } else {
        res.status(405).send('Sadece POST metoduna izin var');
    }
}
