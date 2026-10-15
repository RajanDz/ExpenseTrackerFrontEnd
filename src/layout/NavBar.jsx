import { useNavigate, Link } from 'react-router-dom';
import "../style/NavBar.css";
import { useUser } from '../context/AuthContext';
import { getUser } from '../services/AuthService';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, token, handleSetUser, handleSetToken } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const NAV_LINKS = [
    { label: t('nav.dashboard'), href: '/' },
    { label: t('nav.history'), href: '/budgetsHistory' },
    { label: t('nav.analytics'), href: '/analytics' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'me' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleGetUser = async () => {
    try {
      const data = await getUser(token);
      handleSetUser(data);
    } catch {
      handleSetUser(null);
    }
  };

  const handleLogout = () => {
    handleSetToken(null);
    handleSetUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!token) return;
    handleGetUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className='navbar-content'>

        {/* Logo */}
        <div className="navbar-logo">
          <span>ExpenseTracker</span>
        </div>

        {/* Links — desktop */}
        <div className="navbar-links">
          {NAV_LINKS.map(link => (
            <Link key={link.href} to={link.href}>{link.label}</Link>
          ))}
        </div>

        {/* Right side — desktop */}
        <div className="navbar-user">
          <button className="lang-switcher" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'MNE' : 'EN'}
          </button>
          {user ? (
            <>
              <span className="navbar-username">{user}</span>
              <span onClick={() => navigate('/settings')}>{t('nav.settings')}</span>
              <button className='btn-primary' onClick={handleLogout}>{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <span onClick={() => navigate('/login')}>{t('nav.sign_in')}</span>
              <span onClick={() => navigate('/registration')}>{t('nav.create_account')}</span>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-menu-divider" />
          {user ? (
            <>
              <span className="mobile-menu-user">{user}</span>
              <Link
                to="/settings"
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.settings')}
              </Link>
              <button className="btn-primary mobile-menu-btn" onClick={handleLogout}>{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <button className="btn-primary mobile-menu-btn" onClick={() => { navigate('/login'); setMenuOpen(false); }}>{t('nav.sign_in')}</button>
              <button className="btn-ghost-mobile mobile-menu-btn" onClick={() => { navigate('/registration'); setMenuOpen(false); }}>{t('nav.create_account')}</button>
            </>
          )}
          <div className="mobile-menu-divider" />
          <button className="lang-switcher-mobile" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'MNE' : 'EN'}
          </button>
        </div>
      )}
    </nav>
  );
};
