const USERS_KEY = 'trip-app-users'
const SESSION_KEY = 'trip-app-session'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function saveSession(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id }))
  else localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const { id } = JSON.parse(raw)
    const user = loadUsers().find((u) => u.id === id)
    if (!user) return null
    const { password, ...safe } = user
    return safe
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return !!getCurrentUser()
}

export function register({ name, email, password }) {
  const trimmedName = name?.trim()
  const trimmedEmail = email?.trim().toLowerCase()
  const trimmedPassword = password?.trim()

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    throw new Error('יש למלא את כל השדות')
  }
  if (trimmedPassword.length < 4) {
    throw new Error('סיסמה קצרה מדי (לפחות 4 תווים)')
  }

  const users = loadUsers()
  if (users.some((u) => u.email === trimmedEmail)) {
    throw new Error('כתובת האימייל כבר רשומה')
  }

  const user = {
    id: Date.now(),
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
  }
  users.push(user)
  saveUsers(users)
  saveSession(user)
  window.dispatchEvent(new Event('auth-changed'))
  const { password: _, ...safe } = user
  return safe
}

export function login({ email, password }) {
  const trimmedEmail = email?.trim().toLowerCase()
  const trimmedPassword = password?.trim()
  const user = loadUsers().find((u) => u.email === trimmedEmail && u.password === trimmedPassword)
  if (!user) throw new Error('אימייל או סיסמה שגויים')
  saveSession(user)
  window.dispatchEvent(new Event('auth-changed'))
  const { password: _, ...safe } = user
  return safe
}

export function logout() {
  saveSession(null)
  window.dispatchEvent(new Event('auth-changed'))
}
