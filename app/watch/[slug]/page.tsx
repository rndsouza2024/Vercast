// import { notFound } from "next/navigation"

// async function getVideo(slug: string) {
//   try {
//     // ✅ Use environment variable for API URL
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
//     const [videoResponse, metadataResponse] = await Promise.all([
//       fetch(`${apiUrl}/api/list`, { cache: "no-store" }),
//       fetch(`${apiUrl}/api/github`, { cache: "no-store" }),
//     ])

//     if (!videoResponse.ok || !metadataResponse.ok) {
//       throw new Error("Failed to fetch video data")
//     }

//     const videoData = await videoResponse.json()
//     const metadataData = await metadataResponse.json()

//     if (!videoData.items) {
//       return null
//     }

//     const video = videoData.items.find((v: any) => v.slug === slug)
//     if (!video) return null

//     // Merge with metadata
//     const metadata = metadataData[slug] || {}
//     return {
//       ...video,
//       title: metadata.title || video.name,
//       description: metadata.description || "No description available",
//     }
//   } catch (error) {
//     console.error("Error fetching video:", error)
//     return null
//   }
// }

// export default async function WatchPage({ params }: { params: { slug: string } }) {
//   const video = await getVideo(params.slug)

//   if (!video) {
//     return notFound()
//   }

//   return (

//   <div className="container mx-auto py-8 px-4">
//     <div className="aspect-video relative mb-4">
//       <iframe src={`https://short.icu/${video.slug}`} className="absolute inset-0 w-full h-full" allowFullScreen />
//     </div>
//     <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
//     <p className="text-gray-600 mb-2">{video.description}</p>
//     <div className="text-sm text-gray-500">
//       <p>Resolution: {video.resolution}p</p>
//       <p>Status: {video.status}</p>
//     </div>
//   </div>
//   )
// }















// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Head from "next/head";

// // ✅ Fetch video data from API
// async function getVideo(slug) {
//   if (!slug) return null;
//   try {
//     const response = await fetch("/api/list", { cache: "no-store" });
//     if (!response.ok) throw new Error("Failed to fetch video data");

//     const data = await response.json();
//     return data.items?.find((video) => video.slug === slug) || null;
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     return null;
//   }
// }

// // ✅ Fetch all videos for recommendations
// async function getAllVideos() {
//   try {
//     const response = await fetch("/api/list", { cache: "no-store" });
//     if (!response.ok) throw new Error("Failed to fetch video list");

//     const data = await response.json();
//     return data.items || [];
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     return [];
//   }
// }

// export default function WatchPage({ params }) {
//   const router = useRouter();
//   const [video, setVideo] = useState(null);
//   const [recommended, setRecommended] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!params || !params.slug) {
//       console.error("Invalid video slug");
//       return;
//     }

//     async function fetchVideoData() {
//       setLoading(true);
//       const videoData = await getVideo(params.slug);

//       if (!videoData) {
//         router.push("/404");
//         return;
//       }

//       setVideo(videoData);
//       const allVideos = await getAllVideos();
//       const filteredVideos = allVideos.filter((v) => v.slug !== params.slug);
//       shuffleVideos(filteredVideos);

//       setLoading(false);
//     }

//     fetchVideoData();
//   }, [params.slug]);

//   function shuffleVideos(videos) {
//     const shuffled = [...videos].sort(() => Math.random() - 0.5);
//     setRecommended(shuffled.slice(0, 4));
//   }

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;

//   return (
//     <div className="container mx-auto py-8 px-4">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
//         ← Back
//       </button>

//       {/* ✅ Video Player with Correct Thumbnail */}
//       <div className="aspect-video relative mb-4">
//         <iframe
//           src={`https://short.icu/${video.slug}?thumbnail=${encodeURIComponent(video.thumbnailUrl)}`}
//           className="absolute inset-0 w-full h-full"
//           allowFullScreen
//         />
//       </div>

//       <h1 className="text-2xl font-bold mb-2">{video.name.replace(/\.[^/.]+$/, "")}</h1>
//       <p className="text-gray-600">Resolution: {video.resolution}p</p>
//       <p className="text-gray-500">Status: {video.status}</p>

//       {/* Recommended Videos */}
//       <h2 className="text-xl font-bold mt-8 mb-4">Recommended Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {recommended.map((recVideo, index) => (
//           <Link key={index} href={`/watch/${recVideo.slug}`}>
//             <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 <iframe
//                   src={`https://short.icu/${recVideo.slug}?thumbnail=${encodeURIComponent(recVideo.thumbnailUrl)}`}
//                   title={recVideo.name}
//                   allowFullScreen
//                   className="w-full h-full"
//                 ></iframe>
//               </div>
//               <h3 className="mt-2 text-lg font-semibold">{recVideo.name.replace(/\.[^/.]+$/, "")}</h3>
//               <p className="text-sm text-gray-400">Status: {recVideo.status}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

















































// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Head from "next/head";
// import Image from "next/image";

// // ✅ Fetch video data from API
// async function getVideo(slug) {
//   if (!slug) return null;
//   try {
//     const response = await fetch("/api/list", { cache: "no-store" });
//     if (!response.ok) throw new Error("Failed to fetch video data");

//     const data = await response.json();
//     return data.items?.find((video) => video.slug === slug) || null;
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     return null;
//   }
// }

// // ✅ Fetch all videos for recommendations
// async function getAllVideos() {
//   try {
//     const response = await fetch("/api/list", { cache: "no-store" });
//     if (!response.ok) throw new Error("Failed to fetch video list");

//     const data = await response.json();
//     return data.items || [];
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     return [];
//   }
// }

// // ✅ Fetch GitHub info.json for thumbnails
// async function fetchGithubInfo() {
//   try {
//     const response = await fetch("https://raw.githubusercontent.com/rndsouza2024/info/main/info.json");
//     if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
    
//     return await response.json();
//   } catch (error) {
//     console.warn("❌ Failed to fetch GitHub info.json:", error);
//     return {};
//   }
// }

// export default function WatchPage({ params }) {
//   const router = useRouter();
//   const [video, setVideo] = useState(null);
//   const [recommended, setRecommended] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [githubThumbnails, setGithubThumbnails] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       if (!params || !params.slug) {
//         console.error("Invalid video slug");
//         return;
//       }

//       setLoading(true);

//       const [videoData, allVideos, githubData] = await Promise.all([
//         getVideo(params.slug),
//         getAllVideos(),
//         fetchGithubInfo(),
//       ]);

//       if (!videoData) {
//         router.push("/404");
//         return;
//       }

//       // ✅ Attach GitHub thumbnail if available
//       // const githubThumbnail = githubData[videoData.name]?.thumbnailUrl || videoData.thumbnailUrl;

//       // setVideo({ ...videoData, thumbnailUrl: githubThumbnail });
//       // setGithubThumbnails(githubData);

//       const githubInfo = githubData[videoData.name] || {}; // Get GitHub data if available

// setVideo({
//   ...videoData,
//   thumbnailUrl: githubInfo.thumbnailUrl || videoData.thumbnailUrl, // ✅ Thumbnail from GitHub if available
//   description: githubInfo.description || videoData.description || "No description available", // ✅ Ensure description is fetched
// });

//       // ✅ Prepare recommended videos
//       const filteredVideos = allVideos.filter((v) => v.slug !== params.slug);
//       shuffleVideos(filteredVideos);

//       setLoading(false);
//     }

//     fetchData();
//   }, [params.slug]);

//   function shuffleVideos(videos) {
//     const shuffled = [...videos].sort(() => Math.random() - 0.5);
//     setRecommended(shuffled.slice(0, 4));
//   }

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;

//   return (
//     <div className="container mx-auto py-8 px-4">
//       {/* Back Button */}
//       <button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
//         ← Back
//       </button>

//       {/* ✅ Video Player with GitHub Thumbnail */}
//       <div className="aspect-video relative mb-4">
//         {/* ✅ GitHub Thumbnail as Fallback */}
//         {video.thumbnailUrl && (
//           <Image
//             src={video.thumbnailUrl}
//             alt="Video Thumbnail"
//             layout="fill"
//             objectFit="cover"
//             className="absolute inset-0 w-full h-full"
//           />
//         )}

//         {/* ✅ Video Embed */}
//         <iframe
//           src={`https://short.icu/${video.slug}?thumbnail=${encodeURIComponent(video.thumbnailUrl)}`}
//           className="absolute inset-0 w-full h-full"
//           allowFullScreen
//         />
//       </div>

//       <h1 className="text-2xl font-bold mb-2">{video.name.replace(/\.[^/.]+$/, "")}</h1>
//       <p className="text-gray-600">Resolution: {video.resolution}p</p>
//       <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
//       <p className="text-gray-500">Status: {video.status}</p>

//       {/* Recommended Videos */}
//       <h2 className="text-xl font-bold mt-8 mb-4">Recommended Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {recommended.map((recVideo, index) => {
//           const githubThumbnail = githubThumbnails[recVideo.name]?.thumbnailUrl || recVideo.thumbnailUrl;
//           return (
//             <Link key={index} href={`/watch/${recVideo.slug}`}>
//               <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   {/* ✅ GitHub Thumbnail for Recommendations */}
//                   {githubThumbnail ? (
//                     <Image
//                       src={githubThumbnail}
//                       alt="Recommended Video Thumbnail"
//                       layout="fill"
//                       objectFit="cover"
//                       className="absolute inset-0 w-full h-full"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
//                       ❌ No Thumbnail
//                     </div>
//                   )}

//                   {/* ✅ Video Embed for Recommendations */}
//                   <iframe
//                     src={`https://short.icu/${recVideo.slug}?thumbnail=${encodeURIComponent(githubThumbnail)}`}
//                     title={recVideo.name}
//                     allowFullScreen
//                     className="absolute inset-0 w-full h-full"
//                   ></iframe>
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold">{recVideo.name.replace(/\.[^/.]+$/, "")}</h3>
//                 <p className="text-sm text-gray-400">Status: {recVideo.status}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// ✅ Fetch video data from API
async function getVideo(slug) {
  if (!slug) return null;
  try {
    const response = await fetch("/api/list", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch video data");

    const data = await response.json();
    return data.items?.find((video) => video.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

// ✅ Fetch all videos for recommendations
async function getAllVideos() {
  try {
    const response = await fetch("/api/list", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch video list");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

// ✅ Fetch GitHub info.json for thumbnails
async function fetchGithubInfo() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/rndsouza2024/info/main/info.json");
    if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.warn("❌ Failed to fetch GitHub info.json:", error);
    return {};
  }
}

export default function WatchPage({ params }) {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [githubThumbnails, setGithubThumbnails] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!params || !params.slug) {
        console.error("Invalid video slug");
        return;
      }

      setLoading(true);

      const [videoData, allVideos, githubData] = await Promise.all([
        getVideo(params.slug),
        getAllVideos(),
        fetchGithubInfo(),
      ]);

      if (!videoData) {
        router.push("/404");
        return;
      }

      // ✅ Apply GitHub thumbnail & description if available
      const githubInfo = githubData[videoData.name] || {};

      setVideo({
        ...videoData,
        thumbnailUrl: githubInfo.thumbnailUrl || videoData.thumbnailUrl, // ✅ Ensure GitHub thumbnail is used
        description: githubInfo.description || videoData.description || "No description available",
      });

      // ✅ Store GitHub thumbnails for recommended videos
      setGithubThumbnails(githubData);

      // ✅ Prepare recommended videos
      const filteredVideos = allVideos.filter((v) => v.slug !== params.slug).map((video) => {
        const githubInfo = githubData[video.name] || {};
        return {
          ...video,
          thumbnailUrl: githubInfo.thumbnailUrl || video.thumbnailUrl, // ✅ Correct thumbnail assignment
          description: githubInfo.description || video.description || "No description available",
        };
      });

      shuffleVideos(filteredVideos);
      setLoading(false);
    }

    fetchData();
  }, [params.slug]);

  function shuffleVideos(videos) {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setRecommended(shuffled.slice(0, 4));
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
        ← Back
      </button>

      {/* ✅ Video Player with GitHub Thumbnail */}
      <div className="aspect-video relative mb-4">
        {/* ✅ GitHub Thumbnail as Fallback */}
        {video.thumbnailUrl && (
          <Image
            src={video.thumbnailUrl}
            alt="Video Thumbnail"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* ✅ Video Embed */}
        <iframe
          src={`https://short.icu/${video.slug}?thumbnail=${encodeURIComponent(video.thumbnailUrl)}`}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      </div>

      <h1 className="text-2xl font-bold mb-2">{video.name.replace(/\.[^/.]+$/, "")}</h1>
      <p className="text-gray-600">Resolution: {video.resolution}p</p>
      <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
      <p className="text-gray-500">Status: {video.status}</p>

      {/* Recommended Videos */}
      <h2 className="text-xl font-bold mt-8 mb-4">Recommended Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.map((recVideo, index) => (
          <Link key={index} href={`/watch/${recVideo.slug}`}>
            <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                {/* ✅ Use GitHub Thumbnail for Recommendations */}
                {recVideo.thumbnailUrl ? (
                  <Image
                    src={recVideo.thumbnailUrl}
                    alt="Recommended Video Thumbnail"
                    width={320} // Adjust size as needed
                    height={180}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full">
                    ❌ No Thumbnail Available
                  </div>
                )}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{recVideo.name.replace(/\.[^/.]+$/, "")}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{recVideo.description}</p>
              <p className="text-sm text-gray-400">Status: {recVideo.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
