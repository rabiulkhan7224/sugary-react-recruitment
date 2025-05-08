import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Material } from "@/types/materials"

interface MaterialCardProps {
  material: Material
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const imageUrl = `https://d1wh1xji6f82aw.cloudfront.net/${material.coverPhoto}`

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={material.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{material.title}</h3>
        {material.variantTitle && <p className="text-sm text-gray-500">{material.variantTitle}</p>}
        <p className="text-sm text-gray-500 mt-1">{material.brandName}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="font-bold text-rose-600">${material.salesPriceInUsd.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{material.salesPrice.toFixed(2)} local</p>
        </div>
      </CardFooter>
    </Card>
  )
}
