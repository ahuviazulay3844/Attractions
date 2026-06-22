export function Icon({ name, size = 18, className = '' }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', className: `icon ${className}`, 'aria-hidden': true }

  switch (name) {
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      )
    case 'filter':
      return (
        <svg {...props}>
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...props}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      )
    case 'chevron-up':
      return (
        <svg {...props}>
          <path d="M6 15l6-6 6 6" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c1.5-4 12.5-4 14 0" />
        </svg>
      )
    case 'users':
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M3 20c1.2-3.5 7.8-3.5 9 0M14 20c.8-2 4.2-2 5 0" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
        </svg>
      )
    case 'heart-outline':
      return (
        <svg {...props}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
        </svg>
      )
    case 'login':
      return (
        <svg {...props}>
          <path d="M15 3h4v18h-4M10 12H3m0 0l4-4M3 12l4 4" />
        </svg>
      )
    case 'logout':
      return (
        <svg {...props}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
      )
    case 'map':
      return (
        <svg {...props}>
          <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
          <path d="M9 3v15M15 6v15" />
        </svg>
      )
    case 'message':
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 16 0z" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...props}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'eye-off':
      return (
        <svg {...props}>
          <path d="M3 3l18 18M10.5 10.7A3 3 0 0 0 13.3 13.5M6.2 6.2C4.2 7.6 2.7 9.7 2 12c0 0 3.5 7 10 7 1.8 0 3.4-.5 4.8-1.3M9.9 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-4.1 5.2" />
        </svg>
      )
    default:
      return null
  }
}
