import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input, PasswordInput } from '../components/Field'
import { useToast } from '../components/Toast'
import { Icon } from '../components/Icons'
import { AUTH_ERRORS, validateEmail } from '../utils/auth'

export default function Register() {
  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const returnTo = params.get('return') || '/'
  const prefilledEmail = params.get('email') || ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState(prefilledEmail)
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [saving, setSaving] = useState(false)

  const checkEmail = () => {
    const result = validateEmail(email)
    if (!result.valid) {
      setEmailError(result.message)
      return false
    }
    setEmailError('')
    return true
  }

  const submit = async (e) => {
    e.preventDefault()
    setEmailError('')

    if (!checkEmail()) return

    setSaving(true)
    try {
      await register({ name, email, password })
      toast(`ברוך/ה הבא/ה, ${name.trim()}!`)
      navigate(returnTo)
    } catch (err) {
      if (err.code === AUTH_ERRORS.INVALID_EMAIL) {
        setEmailError(err.message)
      } else {
        toast(err.message, 'error')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container page auth-page">
      <div className="auth-card">
        <div className="auth-icon-wrap">
          <Icon name="user" size={28} />
        </div>
        <h2>הרשמה</h2>
        <p className="auth-sub">
          {prefilledEmail
            ? 'האימייל שלך לא רשום — השלימ/י הרשמה כדי להמשיך'
            : 'צור/י חשבון כדי לשמור מסלולים אישיים'}
        </p>

        <form className="auth-form" onSubmit={submit}>
          <Input label="שם מלא" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="אימייל"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            onBlur={checkEmail}
            error={emailError}
            required
          />
          <PasswordInput label="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary btn-block" disabled={saving}>
            {saving ? 'נרשם...' : 'הרשמה'}
          </button>
        </form>

        <p className="auth-switch">
          כבר רשום/ה? <Link to={`/login?return=${encodeURIComponent(returnTo)}`}>התחברות</Link>
        </p>
        <Link to="/" className="auth-skip">← המשך בלי הרשמה</Link>
      </div>
    </div>
  )
}
