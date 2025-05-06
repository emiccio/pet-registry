"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Lock, Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import { resetPassword, validateResetToken } from "@/actions/auth-actions"

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [valid, setValid] = useState<boolean | null>(null)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await resetPassword({ token, password: formData.password })
      // const res = await fetch(config.apiResetPassword, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password: formData.password }),
      // })

      // if (!res.ok) {
      //   const data = await res.json()
      //   setError(data.message || "Failed to reset password")
      //   setIsSubmitting(false)
      //   return
      // }

      console.log("res", res)

      if (res.success) {
        // Redirect to login with success message
        router.push("/auth/login?reset=success")
      } else {
        setError(res.error || "Failed to reset password")
        setIsSubmitting(false)
      }

    } catch (error) {
      console.error("Error resetting password:", error)
      setError("An error occurred while resetting your password. Please try again.")
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setValid(false)
        return
      }

      const res = await validateResetToken(token)
      console.log("res", res)
      setValid(res.valid)

    }

    validateToken()
  }, [token])

  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      {valid === false ? (
        <Card className="bg-gradient-to-br from-red-100 to-pink-100 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <Shield className="h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-xl font-bold text-red-700 mb-2">Invalid or Expired Link</h2>
              <p className="text-center text-gray-600 mb-4">
                The password reset link is invalid or has expired. Please request a new password reset link.
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/forgot-password">Request New Link</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : valid === null ? (
        // Puedes poner un loader o mensaje de espera
        <p className="text-center text-gray-500">Validating link...</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-primary mb-6 flex items-center justify-center">
            <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
            Create New Password
          </h1>
          <Card className="bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-primary text-center">Reset Your Password</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-6">Please enter your new password below.</p>
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-lg flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-primary" /> New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="mt-1 pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-lg flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-primary" /> Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="Confirm new password"
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
                      Updating...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                  Back to Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
