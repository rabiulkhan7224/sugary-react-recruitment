"use client"

import { useState } from "react"
// import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useToast } from "@/hooks/use-toast"
import { login } from "@/lib/auth"
import { toast } from "sonner"
import { STORAGE_KEYS } from "@/lib/utils"


const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  // const router = useRouter()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "react@test.com",
      password: "playful009",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      console.log("Submitting login form with values:", {
        username: values.username,
        password: values.password.replace(/./g, "*"), // Mask password in logs
      })

      const result = await login(values.username, values.password)
      console.log("Login result:", {
        success: result.success,
        hasToken: !!result.token,
        tokenLength: result.token?.length || 0,
      })

      if (result.success && result.token) {
        // Store the token in localStorage
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, result.token)
        console.log("Token stored in localStorage")

        toast(
          "Login successful",{
          
          description: "Redirecting to dashboard...",
        })

        // Add a small delay to ensure everything is set before redirecting
        setTimeout(() => {
          // Force a hard navigation to ensure cookies are properly processed
          window.location.href = "/dashboard"
        }, 500)
      } else {
        // toast({
        //   variant: "destructive",
        //   title: "Login failed",
        //   description: result.error || "Invalid credentials",
        // })
        toast.error("Login failed")
      }
    } catch (error) {
      console.error("Login form error:", error)
      // toast({
      //   variant: "destructive",
      //   title: "Login failed",
      //   description: "An unexpected error occurred. Please try again.",
      // })
      toast.error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-rose-100">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="react@test.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        <p>Use the provided credentials: react@test.com / playful009</p>
      </CardFooter>
    </Card>
  )
}
