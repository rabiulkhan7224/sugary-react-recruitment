"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  })
const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })
      async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
          const result = await login(values.username, values.password)
    
          if (result.success) {
            toast("Login successful",{
               
              description: "Redirecting to dashboard...",
            })
            router.push("/dashboard")
            router.refresh()
          } else {
            toast("Login failed",{
              
              
              description: result.error || "Invalid credentials",
            })
          }
        } catch (error) {
          toast("Login failed",{
           
            
            description: "An unexpected error occurred. Please try again.",
          })
        } finally {
          setIsLoading(false)
        }
      }

    return (
        <div >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
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
        </Card>
      </div>
    );
};

export default LoginForm;