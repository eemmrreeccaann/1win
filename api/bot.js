export default async function handler(req, res) {
    const BOT_TOKEN = "8151528657:AAH01eW3i0oVq_S62jL3o9oW2v_9y2o9o";
    const MY_ID = "6760722119";

    // Vercel üzerinden botun çalışıp çalışmadığını anlamak için:
    if (req.method === 'GET') {
        return res.status(200).send("Bot Sistemi Aktif!");
    }

    if (req.method === 'POST') {
        try {
            // Gelen veriyi güvenli bir şekilde al
            const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const text = data.message?.text || "Sitede bir hareket var!";

            // Telegram API'sine direkt istek at
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: MY_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            const result = await response.json();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    res.status(405).send('Metot desteklenmiyor');
}
