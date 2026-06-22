import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from './Icons'

const links = [
  { to: '/', label: 'בית', end: true },
  { to: '/attractions', label: 'מסלולים' },
  { to: '/favorites', label: 'מועדפים', authOnly: true },
  { to: '/images', label: 'גלריה' },
]

export default function Navbar() {
  const { user, logout, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-logo"><Icon name="map" size={20} /></span>
          <span>טיולים בישראל</span>
        </NavLink>
        <nav className="nav-links">
          {links.filter((l) => !l.authOnly || isLoggedIn).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <>
              <span className="nav-user">
                <Icon name="user" size={16} />
                {user.name}
              </span>
              <button type="button" className="nav-link nav-btn" onClick={handleLogout}>
                <Icon name="logout" size={16} />
                יציאה
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <Icon name="login" size={16} />
                התחברות
              </Link>
              <Link to="/register" className="nav-link nav-link-accent">
                הרשמה
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
