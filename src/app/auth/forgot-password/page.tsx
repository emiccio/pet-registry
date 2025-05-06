"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call to request password reset
    try {
      // In a real app, you would call your API here
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) throw new Error("Error al enviar el email.")
      router.push("/auth/forgot-password/confirmation?email=" + encodeURIComponent(email))
    } catch (error) {
      console.error("Error requesting password reset:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center justify-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        Recover Your Password
      </h1>
      <Card className="bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-primary text-center">Password Recovery</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-lg flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your registered email"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  Send Recovery Link <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
