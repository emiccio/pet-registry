import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, PawPrint, Heart, MapPin, MessageCircle, Calendar } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4 flex items-center justify-center">
          <Sparkles className="mr-2 h-12 w-12 text-yellow-400" />
          PetPal
        </h1>
        <p className="text-2xl mb-8">The ultimate app for friends who love their pets!</p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/auth/register">Join the Pack</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/login">Welcome Back</Link>
          </Button>
        </div>
        <div className="mt-12 relative h-64 md:h-96">
          <Image 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80" 
            alt="Happy dogs and cats" 
            fill 
            style={{objectFit: "cover"}} 
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Your Furry Friend Needs PetPal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: PawPrint, title: "Easy Pet Profiles", description: "Create adorable profiles for all your pets" },
            { icon: Heart, title: "Lost Pet Alerts", description: "Quickly alert the community if your pet goes missing" },
            { icon: MapPin, title: "Pet-Friendly Map", description: "Discover nearby parks, vets, and pet stores" },
            { icon: MessageCircle, title: "Pet Parent Chat", description: "Connect with other pet lovers in your area" },
          ].map((feature, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* // TODO: mostrar los casos de usos con screenshots de la app */}

      {/* User Stories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Happy Pet Parents and Their Furry Tales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Sarah & Whiskers", story: "PetPal helped me find Whiskers when he snuck out. The community support was amazing!", image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" },
            { name: "Mike & Buddy", story: "I've met so many great local dog owners through PetPal. Buddy loves his new playmates!", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" },
            { name: "Emily & Luna", story: "Keeping track of Luna's vet appointments and vaccinations is so easy now. Thank you, PetPal!", image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" },
          ].map((story, index) => (
            <Card key={index} className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image src={story.image} alt={story.name} width={50} height={50} className="rounded-full mr-4" />
                  <p className="font-semibold">{story.name}</p>
                </div>
                <p className="italic">"{story.story}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Make Your Pet's Life Even Better?</h2>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/auth/register">Join PetPal Now</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 PetPal. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy" className="hover:underline mr-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
