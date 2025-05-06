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
        const response = await fetch(`${API_URL}/AdminAccount/Login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: username,
            Password: password,
          }),
        })
    
        const data = await response.json()
    
        if (!data.Success) {
          return { success: false, error: "Invalid credentials" }
        }
    
        // Store session in cookies
        const cookieStore = await cookies()
    
        // Store tokens securely
        cookieStore.set("accessToken", data.Token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          path: "/",
        })
    
        cookieStore.set("refreshToken", data.RefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        })
    console.log(data)
        // Store user info
        cookieStore.set("user", JSON.stringify(data.User), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        })
    
        // Store expiration times
        cookieStore.set("tokenExpiry", data.AccessTokenExpiresAt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
        })
    
        cookieStore.set("refreshTokenExpiry", data.RefreshTokenExpiresAt, {
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




export async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (!accessToken || !refreshToken) {
    return false
  }

  try {
    const response = await fetch(`${API_URL}/Account/RefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AccessToken: accessToken,
        RefreshToken: refreshToken,
      }),
    })

    const data = await response.json()

    if (!data.Success) {
      return false
    }

    // Update tokens in cookies
    cookieStore.set("accessToken", data.Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    })

    cookieStore.set("refreshToken", data.RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    // Update expiration times
    cookieStore.set("tokenExpiry", data.AccessTokenExpiresAt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    cookieStore.set("refreshTokenExpiry", data.RefreshTokenExpiresAt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return true
  } catch (error) {
    console.error("Token refresh error:", error)
    return false
  }
}