"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PasswordResetConfirmation() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email"

  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center justify-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        Check Your Email
      </h1>
      <Card className="bg-gradient-to-br from-green-100 to-blue-100 shadow-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-primary text-center flex items-center justify-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
            Email Sent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-12 w-12 text-green-500" />
            </div>
            <p className="text-center text-gray-600">
              We've sent a password recovery link to <strong>{email}</strong>. Please check your inbox and follow the
              instructions to reset your password.
            </p>
          </div>
          <div className="space-y-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/login">Return to Login</Link>
            </Button>
            <p className="text-center text-sm text-gray-600">
              Didn't receive the email?{" "}
              <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                Try again
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> In a real application, the email would contain a link with a secure token to reset your
          password. For this demo, you can use the link below to simulate clicking on the recovery link.
        </p>
        <Link
          href="/reset-password?token=demo-token-12345"
          className="mt-2 inline-block text-sm font-medium text-primary hover:text-primary/80"
        >
          Simulate clicking recovery link
        </Link>
      </div>
    </div>
  )
}
