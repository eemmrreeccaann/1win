export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        const token = "8151528657:AAH01eW3i0oVq_S62jL3o9oW2v_9y2o9o";
        const myChatId = "6760722119";

        try {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: myChatId,
                    text: message.text || "Veri geldi!",
                    parse_mode: 'Markdown'
                })
            });
            res.status(200).json({ ok: true });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
