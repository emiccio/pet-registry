'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, User, Mail, Lock, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterInfo(prev => ({ ...prev, [name]: value }))
  }

  // Aquí podrías hacer una solicitud a tu backend para registrar al usuario
  const handleRegister = async (formData: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Registro exitoso, podrías redirigir al login
        console.log('User created', data)
        return true
      } else {
        // Mostrar error
        console.error('Registration failed', data)
        setError(data.message || 'Registration failed')
        return false
      }
    } catch (error) {
      console.error('Something went wrong', error)
      setError('Something went wrong')
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerInfo.password !== registerInfo.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const success = await handleRegister({
      name: registerInfo.name,
      email: registerInfo.email,
      password: registerInfo.password,
    })

    if (!success) return

    // Suponiendo que el registro sea exitoso, haces login automáticamente:
    const res = await signIn('credentials', {
      redirect: false,
      email: registerInfo.email,
      password: registerInfo.password,
    })

    if (res?.error) {
      setError(res.error)
    } else {
      router.push('/my-pets')  // Redirige al usuario
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center justify-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        Join the Pet Community!
      </h1>
      <Card className="bg-gradient-to-br from-blue-100 to-green-100 shadow-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-primary text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <Label htmlFor="name" className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" /> Name
              </Label>
              <Input id="name" name="name" value={registerInfo.name} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" /> Email
              </Label>
              <Input id="email" name="email" type="email" value={registerInfo.email} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-lg flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" /> Password
              </Label>
              <Input id="password" name="password" type="password" value={registerInfo.password} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-lg flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" /> Confirm Password
              </Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" value={registerInfo.confirmPassword} onChange={handleInputChange} required className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <UserPlus className="mr-2 h-5 w-5" /> Sign Up
            </Button>
          </form>
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-r from-blue-100 to-green-100 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Google
              </Button>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

