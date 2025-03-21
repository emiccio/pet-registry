"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, MapPin, Search, Stethoscope, ShoppingBag, TreesIcon as Tree, Scissors } from "lucide-react"

type Service = {
  id: number
  name: string
  type: "vet" | "petstore" | "park" | "grooming"
  address: string
  distance: number
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Happy Paws Vet", type: "vet", address: "123 Main St", distance: 0.5 },
    { id: 2, name: "Petco", type: "petstore", address: "456 Oak Ave", distance: 1.2 },
    { id: 3, name: "Central Dog Park", type: "park", address: "789 Park Rd", distance: 0.8 },
    { id: 4, name: "Fluffy & Clean", type: "grooming", address: "321 Elm St", distance: 1.5 },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<Service["type"] | "all">("all")

  const filteredServices = services.filter(
    (service) =>
      (filterType === "all" || service.type === filterType) &&
      service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getIcon = (type: Service["type"]) => {
    switch (type) {
      case "vet":
        return <Stethoscope className="h-5 w-5 text-red-500" />
      case "petstore":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "park":
        return <Tree className="h-5 w-5 text-green-500" />
      case "grooming":
        return <Scissors className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-blue-400" />
        Pet Services Locator
      </h1>

      <Card className="mb-6 bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <Search className="mr-2 h-6 w-6 text-blue-500" />
            Find Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for services..."
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <Label htmlFor="type">Filter by Type</Label>
              <Select value={filterType} onValueChange={(value: Service["type"] | "all") => setFilterType(value)}>
                <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="vet">Veterinarian</SelectItem>
                  <SelectItem value="petstore">Pet Store</SelectItem>
                  <SelectItem value="park">Park</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="bg-white transform transition-all duration-200 hover:scale-105">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                {getIcon(service.type)}
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{service.type}</p>
                  <p className="text-sm">{service.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>{service.distance} km</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No services found matching your criteria.</p>
      )}
    </div>
  )
}

