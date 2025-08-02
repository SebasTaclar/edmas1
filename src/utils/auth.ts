// Demo users in memory
const DEMO_USERS = [
  {
    email: 'ingeniero.mec.sebastian@gmail.com',
    password: 'sebas123',
    role: 'admin',
    name: 'Sebastian',
  },
  {
    email: 'bustostejedor@gmail.com',
    password: 'miguel123',
    role: 'admin',
    name: 'Miguel',
  },
  {
    email: 'felipe.acosta9403@gmail.com',
    password: 'felipe123',
    role: 'admin',
    name: 'Felipe',
  },
  {
    email: 'jhonbustos@gmail.com',
    password: 'Jhon123',
    role: 'admin',
    name: 'Jhon Bustos',
  },
  {
    email: 'supervisor1@fodiservices.com',
    password: 'super123',
    role: 'supervisor',
    name: 'Ana García',
  },
  {
    email: 'supervisor2@fodiservices.com',
    password: 'super456',
    role: 'supervisor',
    name: 'Carlos López',
  },
  {
    email: 'empleado1@fodiservices.com',
    password: 'emp123',
    role: 'employ',
    name: 'María Rodríguez',
  },
  {
    email: 'empleado2@fodiservices.com',
    password: 'emp456',
    role: 'employ',
    name: 'José Martínez',
  },
]

// Demo authentication function
export const authenticateUser = (email: string, password: string) => {
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password)
  if (user) {
    // Create a mock JWT token
    const token = btoa(
      JSON.stringify({
        email: user.email,
        name: user.name,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      }),
    )
    sessionStorage.setItem('token', token)
    return { success: true, user }
  }
  return { success: false, message: 'Credenciales inválidas' }
}

export const getToken = (): string | null => {
  return sessionStorage.getItem('token')
}

interface TokenData {
  email: string
  name: string
  role: string
  exp: number
}

export const getTokenData = (): TokenData | null => {
  const token = getToken()
  if (!token) return null

  try {
    return JSON.parse(atob(token)) as TokenData
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

export const getTokenName = (): string | null => {
  const tokenData = getTokenData()
  return tokenData?.name || null
}

export const getUserRole = (): string | null => {
  const tokenData = getTokenData()
  return tokenData?.role || null
}

export const isTokenValid = (): boolean => {
  const tokenData = getTokenData()
  if (!tokenData) return false

  try {
    const currentTime = Date.now() / 1000
    return tokenData.exp > currentTime
  } catch (error) {
    console.error('Failed to decode token:', error)
    return false
  }
}

export const userHasAdminRole = (): boolean => {
  return getUserRole() === 'admin'
}

export const userHasSupervisorRole = (): boolean => {
  return getUserRole() === 'supervisor'
}

export const userHasEmployRole = (): boolean => {
  return getUserRole() === 'employ'
}

export const canAccessFinanciero = (): boolean => {
  return userHasAdminRole()
}

export const canAccessOperativo = (): boolean => {
  const role = getUserRole()
  return role === 'admin' || role === 'supervisor'
}

export const canAccessProducto = (): boolean => {
  const role = getUserRole()
  return role === 'admin' || role === 'supervisor'
}

export const canAccessRecursosHumanos = (): boolean => {
  const role = getUserRole()
  return role === 'admin' || role === 'supervisor' || role === 'employ'
}

export const logout = (): void => {
  sessionStorage.removeItem('token')
}
