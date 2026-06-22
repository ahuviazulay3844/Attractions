import { useState } from 'react'
import { Icon } from './Icons'

export function Input({ label, ...props }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  )
}

export function PasswordInput({ label, value, onChange, ...props }) {
  const [show, setShow] = useState(false)

  return (
    <div className="field">
      {label && <label>{label}</label>}
      <div className="password-input-wrap">
        <input
          {...props}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="password-input"
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'הסתר סיסמה' : 'הצג סיסמה'}
          title={show ? 'הסתר סיסמה' : 'הצג סיסמה'}
        >
          <Icon name={show ? 'eye-off' : 'eye'} size={18} />
        </button>
      </div>
    </div>
  )
}

export function Select({ label, options, placeholder, ...props }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <select {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === 'object' ? opt.value : opt
          const text = typeof opt === 'object' ? opt.label : opt
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
    </div>
  )
}
