"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Stethoscope, Apple, Activity, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type Pet = {
  id: number
  name: string
}

type HealthEntry = {
  id: number
  petId: number
  date: string
  type: "symptom" | "behavior" | "diet"
  description: string
}

export default function HealthDiary() {
  const [pets, setPets] = useState<Pet[]>([
    { id: 1, name: "Max" },
    { id: 2, name: "Luna" },
  ])

  const [entries, setEntries] = useState<HealthEntry[]>([
    { id: 1, petId: 1, date: "2023-07-10", type: "symptom", description: "Coughing and sneezing" },
    { id: 2, petId: 2, date: "2023-07-12", type: "behavior", description: "Unusually lethargic" },
    { id: 3, petId: 1, date: "2023-07-15", type: "diet", description: "Introduced new dry food" },
  ])

  const [newEntry, setNewEntry] = useState<Omit<HealthEntry, "id">>({
    petId: 0,
    date: "",
    type: "symptom",
    description: "",
  })

  const [expandedPets, setExpandedPets] = useState<number[]>([])

  const handleAddEntry = () => {
    if (newEntry.petId === 0) {
      alert("Please select a pet")
      return
    }
    setEntries([...entries, { ...newEntry, id: Date.now() }])
    setNewEntry({ petId: 0, date: "", type: "symptom", description: "" })
  }

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const togglePetExpansion = (petId: number) => {
    setExpandedPets(expandedPets.includes(petId) ? expandedPets.filter((id) => id !== petId) : [...expandedPets, petId])
  }

  const getIcon = (type: HealthEntry["type"]) => {
    switch (type) {
      case "symptom":
        return <Stethoscope className="h-5 w-5 text-red-500" />
      case "behavior":
        return <Activity className="h-5 w-5 text-blue-500" />
      case "diet":
        return <Apple className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-green-400" />
        Health Diary
      </h1>

      <Card className="mb-6 bg-gradient-to-br from-green-100 to-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <Stethoscope className="mr-2 h-6 w-6 text-green-500" />
            Add New Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pet">Pet</Label>
              <Select
                value={newEntry.petId.toString()}
                onValueChange={(value) => setNewEntry({ ...newEntry, petId: Number.parseInt(value) })}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newEntry.type}
                onValueChange={(value: HealthEntry["type"]) => setNewEntry({ ...newEntry, type: value })}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="symptom">Symptom</SelectItem>
                  <SelectItem value="behavior">Behavior</SelectItem>
                  <SelectItem value="diet">Diet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            <Button onClick={handleAddEntry} className="w-full bg-green-500 hover:bg-green-600 text-white">
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {pets.map((pet) => (
          <Collapsible
            key={pet.id}
            open={expandedPets.includes(pet.id)}
            onOpenChange={() => togglePetExpansion(pet.id)}
          >
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer">
                  <CardTitle className="text-2xl text-primary flex items-center justify-between">
                    <span className="flex items-center">
                      <Stethoscope className="mr-2 h-6 w-6 text-purple-500" />
                      {pet.name}'s Health Diary
                    </span>
                    {expandedPets.includes(pet.id) ? (
                      <ChevronUp className="h-6 w-6 text-primary" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-primary" />
                    )}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  {entries.filter((entry) => entry.petId === pet.id).length === 0 ? (
                    <p className="text-center text-gray-500">No health entries for {pet.name}</p>
                  ) : (
                    entries
                      .filter((entry) => entry.petId === pet.id)
                      .map((entry) => (
                        <Card
                          key={entry.id}
                          className="bg-white mb-4 transform transition-all duration-200 hover:scale-105"
                        >
                          <CardContent className="flex items-start justify-between p-4">
                            <div className="flex items-start space-x-4">
                              {getIcon(entry.type)}
                              <div>
                                <h3 className="font-semibold">{entry.date}</h3>
                                <p className="text-sm text-gray-500 capitalize">{entry.type}</p>
                                <p className="mt-2">{entry.description}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

