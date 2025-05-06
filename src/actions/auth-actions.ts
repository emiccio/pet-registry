'use server'

import { config } from '@/lib/config'

export async function registerUser(formData: {
  name: string
  email: string
  password: string
}) {
  try {
    const response = await fetch(config.apiRegister, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      // Nota: puedes necesitar agregar `{ cache: 'no-store' }` si estás trabajando con datos dinámicos
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.message || 'Registration failed' }
    }

    return { success: true, data }
  } catch (error) {
    console.error('[Server Action] Registration error:', error)
    return { error: 'Something went wrong' }
  }
}

export async function validateResetToken(token: string) {
  try {
    const response = await fetch(config.apiValidateToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error('[Server Action] Validation error:', error)
    return { error: 'Something went wrong' }
  }
}

export async function resetPassword(formData: {
  token: string
  password: string
}) {
  try {
    const response = await fetch(config.apiResetPassword, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.message || 'Password reset failed' }
    }

    return { success: true, data }
  } catch (error) {
    console.error('[Server Action] Reset password error:', error)
    return { error: 'Something went wrong' }
  }
}
