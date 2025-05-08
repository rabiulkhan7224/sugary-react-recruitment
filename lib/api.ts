"use server"

import { refreshAccessToken, logout } from "@/lib/auth"
import type { MaterialsResponse as BaseMaterialsResponse } from "@/types/materials"

interface MaterialsResponse extends BaseMaterialsResponse {
  __refreshedToken?: string;
}

const API_URL = "https://sugarytestapi.azurewebsites.net"


export async function getMaterials(skip = 0, limit = 20, clientAccessToken?: string): Promise<MaterialsResponse> {
  // Use the token provided by the client
  const accessToken = clientAccessToken

  if (!accessToken) {
    throw new Error("Not authenticated")
  }

  const filter = {
    Skip: skip,
    Limit: limit,
    Types: [1],
  }

  const encodedFilter = Buffer.from(JSON.stringify(filter)).toString("base64")

  try {

    // Simple fetch without headers as requested
    const response = await fetch(`${API_URL}/Materials/GetAll?filter=${encodedFilter}`, {
      cache: "no-store",
    })

    
    if (response.status === 401) {
      console.log("Token expired, attempting to refresh")
      const refreshed = await refreshAccessToken()
      if (refreshed.success && refreshed.token) {
        // Return a special response to tell the client to update its token
        return {
          __refreshedToken: refreshed.token,
          materials: [],
          totalCount: 0,
          remainingCount: 0,
          tags: [],
          deliveryAreas: [],
        }
      }

      // If we get here, refresh failed
      await logout()
      throw new Error("Authentication failed")
    }

    // For non-200 responses, try to get the error message
    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error response text:", errorText)
      throw new Error(`API error: ${response.status} - ${errorText || response.statusText}`)
    }

    // For successful responses, parse as JSON directly
    const data = await response.json()

    // Normalize the response to match our expected format
    // The API returns properties with capital first letters, but our types use lowercase
    return {
      totalCount: data.TotalCount,
      remainingCount: data.RemainingCount,
      tags: data.Tags,
      deliveryAreas: data.DeliveryAreas,
      materials: data.Materials.map((material: { Id: string; Title: string; VariantTitle: string; BrandName: string; CoverPhoto: string; SalesPrice: number; SalesPriceInUsd: number; }) => ({
        id: material.Id,
        title: material.Title,
        variantTitle: material.VariantTitle,
        brandName: material.BrandName,
        coverPhoto: material.CoverPhoto,
        salesPrice: material.SalesPrice,
        salesPriceInUsd: material.SalesPriceInUsd,
      })),
    }
  } catch (error) {
    console.error("Error fetching materials:", error)
    throw error
  }
}
