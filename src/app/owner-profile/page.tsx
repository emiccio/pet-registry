'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Lock, Bell, Sparkles } from 'lucide-react'

export default function OwnerProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    notifications: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = () => {
    setProfile(prev => ({ ...prev, notifications: !prev.notifications }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profile)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="p-4 max-w-md mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        My Profile
      </h1>
      <Card className="bg-gradient-to-br from-blue-100 to-green-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <User className="mr-2 h-6 w-6 text-secondary" />
            Owner Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-muted-foreground" />
                Name
              </Label>
              <Input id="name" name="name" value={profile.name} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg flex items-center">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                Email
              </Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-lg flex items-center">
                <Lock className="mr-2 h-5 w-5 text-muted-foreground" />
                New Password
              </Label>
              <Input id="password" name="password" type="password" placeholder="Leave blank to keep current" className="mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-lg flex items-center cursor-pointer">
                <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
                Receive Notifications
              </Label>
              <Switch
                id="notifications"
                checked={profile.notifications}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

