import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input, PasswordInput } from '../components/Field'
import { useToast } from '../components/Toast'
import { Icon } from '../components/Icons'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const returnTo = params.get('return') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await login({ email, password })
      toast('התחברת בהצלחה!')
      navigate(returnTo)
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container page auth-page">
      <div className="auth-card">
        <div className="auth-icon-wrap">
          <Icon name="login" size={28} />
        </div>
        <h2>התחברות</h2>
        <p className="auth-sub">אופציונלי — נדרש רק לשמירת מסלולים אישיים</p>

        <form className="auth-form" onSubmit={submit}>
          <Input label="אימייל" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <PasswordInput label="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary btn-block" disabled={saving}>
            {saving ? 'מתחבר...' : 'התחברות'}
          </button>
        </form>

        <p className="auth-switch">
          אין לך חשבון? <Link to={`/register?return=${encodeURIComponent(returnTo)}`}>הרשמה</Link>
        </p>
        <Link to="/" className="auth-skip">← המשך בלי התחברות</Link>
      </div>
    </div>
  )
}
