"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, BookOpen, Video, Heart, Dumbbell, Apple, Scissors } from "lucide-react"

type Tip = {
  id: number
  title: string
  content: string
  type: "article" | "video"
  category: "health" | "training" | "nutrition" | "grooming"
}

export default function Tips() {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: 1,
      title: "Basic Dog Training Tips",
      content: "Learn how to teach your dog basic commands...",
      type: "article",
      category: "training",
    },
    {
      id: 2,
      title: "Healthy Diet for Cats",
      content: "Discover the best nutrition practices for your feline friend...",
      type: "article",
      category: "nutrition",
    },
    {
      id: 3,
      title: "Grooming Your Long-Haired Dog",
      content: "https://example.com/video1",
      type: "video",
      category: "grooming",
    },
    {
      id: 4,
      title: "Signs of Common Health Issues in Pets",
      content: "Learn to recognize early symptoms of...",
      type: "article",
      category: "health",
    },
  ])

  const [filterCategory, setFilterCategory] = useState<Tip["category"] | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTips = tips.filter(
    (tip) =>
      (filterCategory === "all" || tip.category === filterCategory) &&
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getIcon = (category: Tip["category"]) => {
    switch (category) {
      case "health":
        return <Heart className="h-5 w-5 text-red-500" />
      case "training":
        return <Dumbbell className="h-5 w-5 text-blue-500" />
      case "nutrition":
        return <Apple className="h-5 w-5 text-green-500" />
      case "grooming":
        return <Scissors className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-indigo-400" />
        Pet Care Tips
      </h1>

      <Card className="mb-6 bg-gradient-to-br from-indigo-100 to-pink-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-indigo-500" />
            Find Tips
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
                placeholder="Search for tips..."
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <Label htmlFor="category">Filter by Category</Label>
              <Select
                value={filterCategory}
                onValueChange={(value: Tip["category"] | "all") => setFilterCategory(value)}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTips.map((tip) => (
          <Card key={tip.id} className="bg-white transform transition-all duration-200 hover:scale-105">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg flex items-center">
                  {getIcon(tip.category)}
                  <span className="ml-2">{tip.title}</span>
                </h3>
                {tip.type === "article" ? (
                  <BookOpen className="h-5 w-5 text-primary" />
                ) : (
                  <Video className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-gray-500 capitalize mb-2">{tip.category}</p>
              {tip.type === "article" ? (
                <p className="text-sm">{tip.content}</p>
              ) : (
                <Button variant="outline" className="w-full">
                  Watch Video
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No tips found matching your criteria.</p>
      )}
    </div>
  )
}

