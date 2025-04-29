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