'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PawPrint, Pencil, Trash2, Sparkles, Camera, Stethoscope, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReportLostPetForm from '@/components/ReportLostPetForm'

// This would typically come from an API or database
const initialPets = [
  { id: 1, name: 'Max', breed: 'Golden Retriever', age: 3, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=624&q=80' },
  { id: 2, name: 'Luna', breed: 'Siamese Cat', age: 2, image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
]

export default function MyPets() {
  const [pets, setPets] = useState(initialPets)
  const [reportingPet, setReportingPet] = useState<number | null>(null)

  const handlePetClick = (id: number) => {
    window.location.href = `/pet-profile/${id}`;
  }

  const handleDelete = (id: number) => {
    setPets(pets.filter(pet => pet.id !== id))
  }

  const handleReportLost = (id: number) => {
    setReportingPet(id)
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
          <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
          My Furry Friends
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map(pet => (
            <Card key={pet.id} className="overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg">
              {reportingPet === pet.id ? (
                <ReportLostPetForm pet={pet} onClose={() => setReportingPet(null)} />
              ) : (
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-40 h-40 overflow-hidden">
                    <Image
                      src={pet.image}
                      alt={`Photo of ${pet.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-2 right-2 rounded-full z-20"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 p-4">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-2xl text-primary flex items-center">
                        <PawPrint className="mr-2 h-6 w-6 text-secondary" />
                        {pet.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-lg"><strong>Breed:</strong> {pet.breed}</p>
                      <p className="text-lg"><strong>Age:</strong> {pet.age} years</p>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => handlePetClick(pet.id)}>
                          <Stethoscope className="h-4 w-4" />
                          <span className="sr-only">View Pet Profile</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleDelete(pet.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleReportLost(pet.id)}>
                          <AlertTriangle className="h-4 w-4" />
                          <span className="sr-only">Report Lost</span>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-4">
          <Link href="/pet-profile">
            <PawPrint className="mr-2 h-5 w-5" /> Add New Pet
          </Link>
        </Button>
      </div>
    </div>
  )
}

