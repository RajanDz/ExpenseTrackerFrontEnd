import { useNavigate } from 'react-router-dom'
import "../style/NavBar.css"
import { useUser } from '../context/AuthContext'
import { getUser } from '../services/AuthService'
import { useEffect, useState, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Dashboard', href: '/' },
  { label: 'History', href: '/budgetsHistory' },
  { label: 'Analytics', href: '/analytics' },
];

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, token, handleSetUser, handleSetToken } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleGetUser = async () => {
    try {
      const data = await getUser(token);
      handleSetUser(data);
    } catch {
      handleSetUser(null);
    }
  }

  const handleLogout = () => {
    handleSetToken(null);
    handleSetUser(null);
    setMenuOpen(false);
    navigate('/login');
  }

  // Zatvori meni klikom van njega
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
  }, [token])

  return (
    <nav className="navbar" ref={menuRef}>
      <div className='navbar-content'>

        {/* Logo */}
        <div className="navbar-logo">
          <span>ExpenseTracker</span>
        </div>

        {/* Linkovi — desktop */}
        <div className="navbar-links">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>

        {/* Desna strana — desktop */}
        <div className="navbar-user">
          {user ? (
            <>
              <span className="navbar-username">{user}</span>
              <button className='btn-primary' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <span onClick={() => navigate('/login')}>Sign in</span>
              <span onClick={() => navigate('/registration')}>Create account</span>
            </>
          )}
        </div>

        {/* Hamburger — mobilni */}
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

      {/* Mobilni dropdown meni */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-menu-divider" />
          {user ? (
            <>
              <span className="mobile-menu-user">{user}</span>
              <button className="btn-primary mobile-menu-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-primary mobile-menu-btn" onClick={() => { navigate('/login'); setMenuOpen(false); }}>Sign in</button>
              <button className="btn-ghost-mobile mobile-menu-btn" onClick={() => { navigate('/registration'); setMenuOpen(false); }}>Create account</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
