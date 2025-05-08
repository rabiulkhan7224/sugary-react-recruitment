"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getMaterials } from "@/lib/api"
import { STORAGE_KEYS } from "@/lib/utils"
import type { Material } from "@/types/materials"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { toast } from "sonner"
import MaterialCard from "./material-card"

export default function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const limit = 12
//   

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 500px 0px",
  })

  const loadMaterials = async (skipCount: number) => {
    try {
      setIsLoading(true)

      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      if (!accessToken) {
        console.error("No access token found in localStorage")
        setError("Not authenticated. Please log in again.")
        // Redirect to login page
        window.location.href = "/"
        return
      }


      try {
        const response = await getMaterials(skipCount, limit, accessToken)

        // Check if we got a refreshed token
        if ((response as { __refreshedToken: string }).__refreshedToken) {
          // Update the token in localStorage
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, (response as { __refreshedToken: string }).__refreshedToken)
          console.log("Access token refreshed and updated in localStorage")

          // Retry the request with the new token
          const newToken = (response as { __refreshedToken: string }).__refreshedToken
          const retryResponse = await getMaterials(skipCount, limit, newToken)

          if (retryResponse.materials) {
            if (skipCount === 0) {
              setMaterials(retryResponse.materials)
            } else {
              setMaterials((prev) => [...prev, ...retryResponse.materials])
            }

            setHasMore(retryResponse.remainingCount > 0)
            setSkip(skipCount + limit)
          }
        } else if (response.materials) {
          if (skipCount === 0) {
            setMaterials(response.materials)
          } else {
            setMaterials((prev) => [...prev, ...response.materials])
          }

          setHasMore(response.remainingCount > 0)
          setSkip(skipCount + limit)
        }
      } catch (apiError) {
        console.error("API error:", apiError)

        if (apiError instanceof Error) {
          const errorMessage = apiError.message

          if (
            errorMessage.includes("Authentication failed") ||
            errorMessage.includes("Not authenticated") ||
            errorMessage.includes("401")
          ) {
            setError("Your session has expired. Please log in again.")
            toast("Session expired",{
             
              description: "Please log in again to continue.",
            })
            // Clear localStorage and redirect to login
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
            setTimeout(() => {
              window.location.href = "/"
            }, 1500)
          } else {
            setError(`Failed to load materials: ${errorMessage}`)
            toast("Error loading materials",{
              
              description: errorMessage,
            })
          }
        } else {
          setError("Failed to load materials. Please try again.")
        }
      }
    } catch (err) {
      console.error("Error in loadMaterials:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMaterials(0)
  }, [])

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMaterials(skip)
    }
  }, [inView, isLoading, hasMore, skip])

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => loadMaterials(0)}
          className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}

        {isLoading &&
          skip === 0 &&
          Array(8)
            .fill(0)
            .map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {isLoading && skip > 0 && (
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
              </div>
              <p className="text-sm text-gray-500">Loading more materials...</p>
            </div>
          )}
        </div>
      )}

      {!hasMore && materials.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You ve reached the end of the list</p>
        </div>
      )}
    </div>
  )
}
