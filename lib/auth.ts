"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User } from "@/types/auth"

const API_URL = "https://sugarytestapi.azurewebsites.net"

// Cookie names
const COOKIE_NAMES = {
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
}

// LocalStorage keys


// Cookie options
const getCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge,
  path: "/",
  sameSite: "lax" as const,
})

export interface Session {
  accessToken: string
  refreshToken: string
  user: User
}

// Updated interface to match the exact API response structure
interface AuthResponse {
  Success: boolean
  Token: string
  RefreshToken: string
  AccessTokenExpiresAt: string
  RefreshTokenExpiresAt: string
  User: User
}

/**
 * Authenticate user with username and password
 */
export async function login(
  username: string,
  password: string,
): Promise<{
  success: boolean
  error?: string
  token?: string // Return token to client for localStorage
}> {
  try {
    console.log("Login attempt for:", username)

    const response = await fetch(`${API_URL}/AdminAccount/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        UserName: username,
        Password: password,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Server error: ${response.status} ${response.statusText}`)

      // Try to get the error message from the response
      let errorMessage = `Server error: ${response.status} ${response.statusText}`
      try {
        const errorText = await response.text()
        if (errorText) {
          errorMessage = errorText
          // Try to parse as JSON if possible
          if (errorText.trim().startsWith("{")) {
            const errorJson = JSON.parse(errorText)
            if (errorJson.message) {
              errorMessage = errorJson.message
            }
          }
        }
      } catch (e) {
        console.log(e)

        // Ignore parsing errors
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    // Get the raw response text first for debugging
    const rawData = await response.text()
    console.log("Raw API response length:", rawData.length)

    // Now parse it as JSON
    let data: AuthResponse
    try {
      data = JSON.parse(rawData) as AuthResponse
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.log("First 100 chars of response:", rawData.substring(0, 100))
      return {
        success: false,
        error: "Failed to parse server response",
      }
    }

    console.log("Login response success:", data.Success)
    console.log("Token exists:", !!data.Token)
    console.log("Token length:", data.Token?.length || 0)

    if (!data.Success) {
      return { success: false, error: "Invalid credentials" }
    }

    // Verify token exists before setting cookies
    if (!data.Token) {
      console.error("Token is missing in the response")
      return { success: false, error: "Authentication token missing in response" }
    }

    // Store refresh token and user in cookies
    const cookieStore = await cookies()

    // Set refresh token (7 days)
    cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, data.RefreshToken, getCookieOptions(7 * 24 * 60 * 60))

    // Set user data
    cookieStore.set(COOKIE_NAMES.USER, JSON.stringify(data.User), getCookieOptions(7 * 24 * 60 * 60))

    // Return the access token to be stored in localStorage on the client
    return {
      success: true,
      token: data.Token,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

/**
 * Refresh the access token using the refresh token
 */
export async function refreshAccessToken(): Promise<{ success: boolean; token?: string }> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value

  if (!refreshToken) {
    console.log("No refresh token found")
    return { success: false }
  }

  try {
    // We need to get the access token from the client
    // This is a server action, so we can't access localStorage directly
    // For refresh, we'll just use an empty string for the access token
    // The API should still refresh based on the refresh token

    const response = await fetch(`${API_URL}/Account/RefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        AccessToken: "", // Empty for refresh
        RefreshToken: refreshToken,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`Refresh token error: ${response.status} ${response.statusText}`)

      // Try to get error details
      try {
        const errorText = await response.text()
        console.error("Refresh token error response:", errorText)
      } catch (e) {
        // Ignore
        console.log(e)
      }

      return { success: false }
    }

    // Log the raw response for debugging
    const rawData = await response.text()
    console.log("Raw refresh response length:", rawData.length)

    // Parse the response
    let data: AuthResponse
    try {
      data = JSON.parse(rawData) as AuthResponse
    } catch (parseError) {
      console.error("JSON parse error in refresh:", parseError)
      console.log("First 100 chars of refresh response:", rawData.substring(0, 100))
      return { success: false }
    }

    if (!data.Success) {
      console.error("Refresh token failed: Success is false")
      return { success: false }
    }

    // Verify token exists before setting cookies
    if (!data.Token) {
      console.error("Token is missing in the refresh response")
      return { success: false }
    }

    // Update cookies with the correct property names
    cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, data.RefreshToken, getCookieOptions(7 * 24 * 60 * 60))
    cookieStore.set(COOKIE_NAMES.USER, JSON.stringify(data.User), getCookieOptions(7 * 24 * 60 * 60))

    return {
      success: true,
      token: data.Token,
    }
  } catch (error) {
    console.error("Token refresh error:", error)
    return { success: false }
  }
}

/**
 * Clear all session cookies and localStorage
 * This is a server action, but we'll return a flag to clear localStorage on the client
 */
export async function logout(): Promise<{ clearLocalStorage: boolean }> {
  const cookieStore = await cookies()

  // Clear all session cookies
  Object.values(COOKIE_NAMES).forEach((name) => {
    cookieStore.delete(name)
  })

  // Return a flag to clear localStorage on the client
  return { clearLocalStorage: true }
}


export async function getSession(clientAccessToken?: string): Promise<Session | null> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value
  const userJson = cookieStore.get(COOKIE_NAMES.USER)?.value

  
  if (!clientAccessToken || !refreshToken || !userJson) {
    return null
  }

  try {
    const user = JSON.parse(userJson) as User

    return {
      accessToken: clientAccessToken,
      refreshToken,
      user,
    }
  } catch (error) {
    console.error("Session parsing error:", error)
    return null
  }
}





export async function requireAuth() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value
  const userJson = cookieStore.get(COOKIE_NAMES.USER)?.value

  if (!refreshToken || !userJson) {
    redirect("/")
  }

  try {
    const user = JSON.parse(userJson) as User
    return { user }
  } catch (error) {
    console.log(error)
    redirect("/")
  }
}
