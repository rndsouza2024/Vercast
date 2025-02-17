import type { MetadataRoute } from "next"

async function fetchVideos() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
    const response = await fetch(`${apiUrl}/api/list`)
    if (!response.ok) return []
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error("Error fetching videos for sitemap:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const videos = await fetchVideos()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://vercast.vercel.app/"

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  // Add video routes
  const videoRoutes = videos.map((video: any) => ({
    url: `${baseUrl}/watch/${video.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }))

  return [...routes, ...videoRoutes]
}

