"use server"
import { User } from "@/types/auth";
import { cookies } from "next/headers";

const API_URL = "https://sugarytestapi.azurewebsites.net"

export interface Session {
    accessToken: string
    refreshToken: string
    accessTokenExpiresAt: string
    refreshTokenExpiresAt: string
    user: User
  }
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {

        const response = await fetch(`${API_URL}/AdminAccount/Login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                })
            }
        )
        const data= await response.json()
        console.log(data)
        if(!data.Success){
            return { success: false, error: data.error || "Invalid credentials" }
        }

       
    const cookieStore =  await cookies()

    
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      })

     cookieStore.set("refreshToken",data.RefreshToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // 30 days   
        })

        // Store user info
    cookieStore.set("user", JSON.stringify(data.User), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      })
            

        return { success: true }
    } catch (error) {
        console.error("Login error:", error)
        return { success: false, error: "An error occurred during login" }
    }
}