'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, MapPin, Calendar, FileImage } from 'lucide-react'

type Pet = {
  id: number;
  name: string;
  breed: string;
  age: number;
  image: string;
}

type ReportLostPetFormProps = {
  pet: Pet;
  onClose: () => void;
}

export default function ReportLostPetForm({ pet, onClose }: ReportLostPetFormProps) {
  const [lostPetInfo, setLostPetInfo] = useState({
    petName: pet.name,
    lastSeen: '',
    location: '',
    description: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLostPetInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lost pet report submitted:', lostPetInfo)
    // Here you would typically send this data to your backend
    onClose()
  }

  return (
    <Card className="bg-gradient-to-br from-red-100 to-orange-100 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-primary flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-red-500" />
          Report {pet.name} as Lost
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="petName" className="text-lg flex items-center">
              <span className="mr-2">🐾</span> Pet Name
            </Label>
            <Input id="petName" name="petName" value={lostPetInfo.petName} onChange={handleInputChange} required className="mt-1" readOnly />
          </div>
          <div>
            <Label htmlFor="lastSeen" className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" /> Last Seen
            </Label>
            <Input id="lastSeen" name="lastSeen" type="datetime-local" value={lostPetInfo.lastSeen} onChange={handleInputChange} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="location" className="text-lg flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" /> Location
            </Label>
            <Input id="location" name="location" value={lostPetInfo.location} onChange={handleInputChange} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg flex items-center">
              <FileImage className="mr-2 h-5 w-5 text-primary" /> Description
            </Label>
            <Textarea id="description" name="description" value={lostPetInfo.description} onChange={handleInputChange} required className="mt-1" />
          </div>
          <div className="flex justify-between">
            <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
              <AlertTriangle className="mr-2 h-5 w-5" /> Report Lost Pet
            </Button>
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

