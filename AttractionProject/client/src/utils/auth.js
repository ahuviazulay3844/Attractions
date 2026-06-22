const USERS_KEY = 'trip-app-users'
const SESSION_KEY = 'trip-app-session'

export const AUTH_ERRORS = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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

function authError(message, code, extra = {}) {
  const err = new Error(message)
  err.code = code
  Object.assign(err, extra)
  return err
}

export function validateEmail(email) {
  const trimmed = email?.trim().toLowerCase()
  if (!trimmed) {
    return { valid: false, message: 'יש להזין כתובת אימייל' }
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, message: 'כתובת האימייל אינה תקינה' }
  }
  return { valid: true, email: trimmed }
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
  const emailCheck = validateEmail(email)
  const trimmedPassword = password?.trim()

  if (!trimmedName) {
    throw new Error('יש להזין שם מלא')
  }
  if (!emailCheck.valid) {
    throw authError(emailCheck.message, AUTH_ERRORS.INVALID_EMAIL)
  }
  if (!trimmedPassword) {
    throw new Error('יש להזין סיסמה')
  }
  if (trimmedPassword.length < 4) {
    throw new Error('סיסמה קצרה מדי (לפחות 4 תווים)')
  }

  const users = loadUsers()
  if (users.some((u) => u.email === emailCheck.email)) {
    throw new Error('כתובת האימייל כבר רשומה')
  }

  const user = {
    id: Date.now(),
    name: trimmedName,
    email: emailCheck.email,
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
  const emailCheck = validateEmail(email)
  if (!emailCheck.valid) {
    throw authError(emailCheck.message, AUTH_ERRORS.INVALID_EMAIL)
  }

  const trimmedPassword = password?.trim()
  if (!trimmedPassword) {
    throw new Error('יש להזין סיסמה')
  }

  const users = loadUsers()
  const user = users.find((u) => u.email === emailCheck.email)

  if (!user) {
    throw authError('האימייל לא רשום במערכת', AUTH_ERRORS.EMAIL_NOT_FOUND, {
      email: emailCheck.email,
    })
  }

  if (user.password !== trimmedPassword) {
    throw authError('הסיסמה שגויה', AUTH_ERRORS.WRONG_PASSWORD)
  }

  saveSession(user)
  window.dispatchEvent(new Event('auth-changed'))
  const { password: _, ...safe } = user
  return safe
}

export function logout() {
  saveSession(null)
  window.dispatchEvent(new Event('auth-changed'))
}
