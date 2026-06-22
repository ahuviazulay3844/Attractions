import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'בית', end: true },
  { to: '/attractions', label: 'מסלולים' },
  { to: '/images', label: 'גלריה' },
  { to: '/comments', label: 'תגובות' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-logo">🌿</span>
          <span>טיולים בישראל</span>
        </NavLink>
        <nav className="nav-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
