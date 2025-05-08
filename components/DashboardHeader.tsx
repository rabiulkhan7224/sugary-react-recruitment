"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logout } from "@/lib/auth"
import type { User } from "@/types/auth"
import { STORAGE_KEYS } from "@/lib/utils"

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const result = await logout()

    // Clear localStorage if needed
    if (result.clearLocalStorage) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    }

    router.push("/")
    router.refresh()
  }

  // Updated to use the correct property names from the API
  const avatarUrl = user.Avatar ? `https://d1wh1xji6f82aw.cloudfront.net/${user.Avatar}` : null

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-rose-600">
            Sugary
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={avatarUrl || ""} alt={user.FullName} />
                    <AvatarFallback>{user.FullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.FullName}</p>
                    <p className="text-sm text-gray-500">{user.Email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 py-4">
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-md hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </nav>
              </div>
              <div className="border-t pt-4">
                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatarUrl || ""} alt={user.FullName} />
              <AvatarFallback>{user.FullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.FullName}</p>
              <p className="text-xs text-gray-500">{user.Email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
