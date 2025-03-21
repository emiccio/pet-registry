"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PawPrint, Camera, Sparkles, BookOpen } from "lucide-react"
import Image from "next/image"
import VeterinaryNotebook from "@/components/VeterinaryNotebook"
import Link from "next/link"

// This would typically come from an API or database
const petData = {
  1: {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=624&q=80",
  },
  2: {
    id: 2,
    name: "Luna",
    breed: "Siamese Cat",
    age: 2,
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
}

export default function PetProfile() {
  const params = useParams()
  const router = useRouter()
  const petId = params.id as string
  const pet = petData[petId]

  const [photos, setPhotos] = useState([
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  ])

  if (!pet) {
    return <div>Pet not found</div>
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        {pet.name}'s Profile
      </h1>

      <Card className="mb-8 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-64 overflow-hidden">
            <Image
              src={pet.image || "/placeholder.svg"}
              alt={`Photo of ${pet.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex-1 p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-3xl text-primary flex items-center">
                <PawPrint className="mr-2 h-8 w-8 text-secondary" />
                {pet.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xl mb-2">
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p className="text-xl mb-2">
                <strong>Age:</strong> {pet.age} years
              </p>
              <Link href="/health-diary">
                <Button className="mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Health Diary
                </Button>
              </Link>
            </CardContent>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="health">Health Record</TabsTrigger>
          <TabsTrigger value="photos">Photo Album</TabsTrigger>
        </TabsList>
        <TabsContent value="health">
          <VeterinaryNotebook />
        </TabsContent>
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Camera className="mr-2 h-6 w-6" />
                Photo Album
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`${pet.name}'s photo ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Camera className="mr-2 h-5 w-5" /> Add New Photo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}