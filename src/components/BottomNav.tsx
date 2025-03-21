"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PawPrint, Bell, BookOpen, MapPin, BookMarked } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home", color: "text-pink-500" },
  { href: "/my-pets", icon: PawPrint, label: "My Pets", color: "text-purple-500" },
  { href: "/reminders", icon: Bell, label: "Reminders", color: "text-yellow-500" },
  { href: "/health-diary", icon: BookOpen, label: "Health Diary", color: "text-green-500" },
  { href: "/services", icon: MapPin, label: "Services", color: "text-blue-500" },
  { href: "/tips", icon: BookMarked, label: "Tips", color: "text-indigo-500" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-3xl shadow-lg overflow-x-auto">
      <ul className="flex justify-around">
        {navItems.map((item) => (
          <li key={item.href} className="flex-shrink-0">
            <Link
              href={item.href}
              className={`flex flex-col items-center p-2 ${pathname === item.href ? `${item.color} animate-bounce-subtle` : "text-gray-400"
                }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

