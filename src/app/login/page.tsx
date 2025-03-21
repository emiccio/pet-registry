'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Lock, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', loginInfo)
    // Here you would typically handle the login process
  }

  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center justify-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        Welcome Back!
      </h1>
      <Card className="bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-primary text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-lg flex items-centers">
                <Mail className="mr-2 h-5 w-5 text-primary" /> Email
              </Label>
              <Input id="email" name="email" type="email" value={loginInfo.email} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-lg flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" /> Password
              </Label>
              <Input id="password" name="password" type="password" value={loginInfo.password} onChange={handleInputChange} required className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <LogIn className="mr-2 h-5 w-5" /> Log In
            </Button>
          </form>
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-r from-purple-100 to-pink-100 text-gray-500">
                  Or continue with
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
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

