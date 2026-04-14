export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            const token = "8151528657:AAH01eW3i0oVq_S62jL3o9oW2v_9y2o9o";
            const chatId = "6760722119";

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: body.message?.text || "Veri geldi ama metin yok!",
                    parse_mode: 'Markdown'
                })
            });

            return res.status(200).json({ success: true });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
    res.status(405).send('Method Not Allowed');
}
