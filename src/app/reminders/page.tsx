"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Sparkles, Syringe, Apple, Dumbbell, ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type Pet = {
  id: number
  name: string
}

type Reminder = {
  id: number
  petId: number
  title: string
  startDate: string
  endDate: string
  time: string
  type: "vaccine" | "deworming" | "vet" | "food" | "exercise" | "medication"
  recurrence: "once" | "daily" | "custom"
  customDays?: number
  active: boolean
}

export default function Reminders() {
  const [pets, setPets] = useState<Pet[]>([
    { id: 1, name: "Max" },
    { id: 2, name: "Luna" },
  ])

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      petId: 1,
      title: "Rabies Vaccine",
      startDate: "2023-07-15",
      endDate: "2023-07-15",
      time: "09:00",
      type: "vaccine",
      recurrence: "once",
      active: true,
    },
    {
      id: 2,
      petId: 2,
      title: "Deworming",
      startDate: "2023-07-20",
      endDate: "2023-07-20",
      time: "10:00",
      type: "deworming",
      recurrence: "once",
      active: true,
    },
    {
      id: 3,
      petId: 1,
      title: "Vet Checkup",
      startDate: "2023-08-01",
      endDate: "2023-08-01",
      time: "14:00",
      type: "vet",
      recurrence: "once",
      active: true,
    },
    {
      id: 4,
      petId: 2,
      title: "Feed Time",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      time: "08:00",
      type: "food",
      recurrence: "daily",
      active: true,
    },
  ])

  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id" | "active">>({
    petId: 0,
    title: "",
    startDate: "",
    endDate: "",
    time: "",
    type: "vaccine",
    recurrence: "once",
  })

  const [expandedPets, setExpandedPets] = useState<number[]>([])

  const handleAddReminder = () => {
    if (newReminder.petId === 0) {
      alert("Please select a pet")
      return
    }
    setReminders([...reminders, { ...newReminder, id: Date.now(), active: true }])
    setNewReminder({ petId: 0, title: "", startDate: "", endDate: "", time: "", type: "vaccine", recurrence: "once" })
  }

  const handleToggleReminder = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, active: !reminder.active } : reminder)),
    )
  }

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const togglePetExpansion = (petId: number) => {
    setExpandedPets(expandedPets.includes(petId) ? expandedPets.filter((id) => id !== petId) : [...expandedPets, petId])
  }

  const getIcon = (type: Reminder["type"]) => {
    switch (type) {
      case "vaccine":
        return <Syringe className="h-5 w-5 text-blue-500" />
      case "deworming":
        return <Syringe className="h-5 w-5 text-green-500" />
      case "vet":
        return <Bell className="h-5 w-5 text-red-500" />
      case "food":
        return <Apple className="h-5 w-5 text-yellow-500" />
      case "exercise":
        return <Dumbbell className="h-5 w-5 text-purple-500" />
      case "medication":
        return <Syringe className="h-5 w-5 text-pink-500" />
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-yellow-400" />
        Reminders & Alerts
      </h1>

      <Card className="mb-6 bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <Bell className="mr-2 h-6 w-6 text-yellow-500" />
            Add New Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pet">Pet</Label>
              <Select
                value={newReminder.petId.toString()}
                onValueChange={(value) => setNewReminder({ ...newReminder, petId: Number.parseInt(value) })}
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newReminder.startDate}
                  onChange={(e) => setNewReminder({ ...newReminder, startDate: e.target.value })}
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newReminder.type}
                onValueChange={(value: Reminder["type"]) => setNewReminder({ ...newReminder, type: value })}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vaccine">Vaccine</SelectItem>
                  <SelectItem value="deworming">Deworming</SelectItem>
                  <SelectItem value="vet">Vet Appointment</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recurrence">Recurrence</Label>
              <Select
                value={newReminder.recurrence}
                onValueChange={(value: Reminder["recurrence"]) => setNewReminder({ ...newReminder, recurrence: value })}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Once</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newReminder.recurrence === "custom" && (
              <div>
                <Label htmlFor="customDays">Number of Days</Label>
                <Input
                  id="customDays"
                  type="number"
                  value={newReminder.customDays || ""}
                  onChange={(e) => setNewReminder({ ...newReminder, customDays: Number.parseInt(e.target.value) })}
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
            )}
            {(newReminder.recurrence === "daily" || newReminder.recurrence === "custom") && (
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newReminder.endDate}
                  onChange={(e) => setNewReminder({ ...newReminder, endDate: e.target.value })}
                  className="bg-white/50 backdrop-blur-sm"
                />
              </div>
            )}
            <Button onClick={handleAddReminder} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
              Add Reminder
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
                      <Bell className="mr-2 h-6 w-6 text-purple-500" />
                      {pet.name}'s Reminders
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
                  {reminders.filter((reminder) => reminder.petId === pet.id).length === 0 ? (
                    <p className="text-center text-gray-500">No reminders for {pet.name}</p>
                  ) : (
                    reminders
                      .filter((reminder) => reminder.petId === pet.id)
                      .map((reminder) => (
                        <Card
                          key={reminder.id}
                          className={`${reminder.active ? "bg-white" : "bg-gray-100"
                            } mb-4 transform transition-all duration-200 hover:scale-105`}
                        >
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-4">
                              {getIcon(reminder.type)}
                              <div>
                                <h3 className="font-semibold">{reminder.title}</h3>
                                <p className="text-sm text-gray-500">
                                  {reminder.startDate}
                                  {reminder.recurrence !== "once" && ` to ${reminder.endDate}`}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {reminder.time}
                                  {reminder.recurrence === "daily" && " (Daily)"}
                                  {reminder.recurrence === "custom" && ` (${reminder.customDays} days)`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={reminder.active}
                                onCheckedChange={() => handleToggleReminder(reminder.id)}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteReminder(reminder.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
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

