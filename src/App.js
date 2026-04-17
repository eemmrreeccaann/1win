import React, { useState, useEffect } from 'react';
import './App.css';import

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const openTelegram = () => {
    window.open(''''https://t.me/your_telegram_channel'''', ''''_blank'''');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Giriş Yap</h2>
          <div className="input-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input type="text" id="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Şifre</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="login-btn">Giriş Yap</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Your existing app content can go here */}
      <div className="profile-container">
        <button onClick={toggleProfileMenu} className="profile-button">
          Profil
        </button>
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <div className="profile-menu-header">
              <span className="pmi-user-id">ID: 123456</span>
              <button onClick={() => setIsProfileMenuOpen(false)} className="pmi-close-btn">✖</button>
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
                <span className="pmi-icon">🎁</span>
                <div className="pmi-text">
                  <span className="pmi-title">Bonuslar</span>
                  <span className="pmi-desc">Ücretsiz döndürmeler ve diğer teklifler</span>
                </div>
              </button>
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">🏷️</span>
                <div className="pmi-text">
                  <span className="pmi-title">Bonus code''''ları</span>
                  <span className="pmi-desc">Kod etkinleştirme</span>
                </div>
              </button>
            </div>

            <div className="profile-menu-group">
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">🕐</span>
                <div className="pmi-text">
                  <span className="pmi-title">Bahis geçmişi</span>
                  <span className="pmi-desc">Açık ve sonuçlanmış bahisler</span>
                </div>
              </button>
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">💳</span>
                <div className="pmi-text">
                  <span className="pmi-title">Ödeme geçmişi</span>
                  <span className="pmi-desc">Para yatırma ve çekme durumları</span>
                </div>
              </button>
            </div>

            <div className="profile-menu-group">
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">⚙️</span>
                <div className="pmi-text">
                  <span className="pmi-title">Ayarlar</span>
                  <span className="pmi-desc">Kişisel verileri düzenle</span>
                </div>
              </button>
              <button className="profile-menu-item" onClick={openTelegram}>
                <span className="pmi-icon">🔄</span>
                <div className="pmi-text">
                  <span className="pmi-title">7/24 destek</span>
                  <span className="pmi-desc">Tüm iletişim bilgileri</span>
                </div>
              </button>
            </div>

            <button onClick={handleLogout} className="profile-logout" data-testid="logout-btn">Çıkış Yap</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
'''