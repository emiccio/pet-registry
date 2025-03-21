'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Camera, Sparkles } from 'lucide-react'

export default function PetProfile() {
  const [petInfo, setPetInfo] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPetInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Pet info submitted:', petInfo)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        Pet Profile
      </h1>
      <Card className="bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            {/* Add PawPrint icon here if available */}
            Add New Furry Friend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <Button variant="outline" className="rounded-full p-8 aspect-square">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </Button>
            </div>
            <div>
              <Label htmlFor="name" className="text-lg">Pet's Name</Label>
              <Input id="name" name="name" value={petInfo.name} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="breed" className="text-lg">Breed</Label>
              <Input id="breed" name="breed" value={petInfo.breed} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="age" className="text-lg">Age</Label>
              <Input id="age" name="age" type="number" value={petInfo.age} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="gender" className="text-lg">Gender</Label>
              <Input id="gender" name="gender" value={petInfo.gender} onChange={handleInputChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="notes" className="text-lg">Fun Facts</Label>
              <Textarea id="notes" name="notes" value={petInfo.notes} onChange={handleInputChange} className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Furry Friend
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

