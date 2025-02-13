// import { notFound } from "next/navigation"

// async function getVideo(slug) {
//   // In a real app, you would fetch video data from your database
//   // For now, we'll return mock data
//   return {
//     slug,
//     title: "Sample Video",
//     description: "This is a sample video description.",
//     embedUrl: `https://short.icu/${slug}`,
//   }
// }

// export default async function WatchPage({ params }) {
//   const video = await getVideo(params.slug)

//   if (!video) {
//     notFound()
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="aspect-video relative mb-4">
//         <iframe src={video.embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen />
//       </div>
//       <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
//       <p className="text-gray-600">{video.description}</p>
//     </div>
//   )
// }














// import { notFound } from "next/navigation";

// async function getVideo(slug) {
//   const response = await fetch(`http://localhost:3000/api/list`);
//   const data = await response.json();

//   if (!data.items) {
//     return null;
//   }

//   return data.items.find((video) => video.slug === slug);
// }

// export default async function WatchPage({ params }) {
//   const video = await getVideo(params.slug);

//   if (!video) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="aspect-video relative mb-4">
//         <iframe
//           src={`https://short.icu/${video.slug}`}
//           className="absolute inset-0 w-full h-full"
//           allowFullScreen
//         />
//       </div>
//       <h1 className="text-2xl font-bold mb-2">{video.name}</h1>
//       <p className="text-gray-600">Resolution: {video.resolution}p</p>
//       <p className="text-gray-500">Status: {video.status}</p>
//     </div>
//   );
// }




















// import { notFound } from "next/navigation";

// async function getVideo(slug) {
//   const response = await fetch(`http://localhost:3000/api/list`);
//   const data = await response.json();

//   if (!data.items) {
//     return null;
//   }

//   return data.items.find((video) => video.slug === slug);
// }

// export default async function WatchPage({ params }) {
//   const video = await getVideo(params.slug);

//   if (!video) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="aspect-video relative mb-4">
//         <iframe
//           src={`https://short.icu/${video.slug}`}
//           className="absolute inset-0 w-full h-full"
//           allowFullScreen
//         />
//       </div>
//       <h1 className="text-2xl font-bold mb-2">{video.name}</h1>
//       <p className="text-gray-600">Resolution: {video.resolution}p</p>
//       <p className="text-gray-500">Status: {video.status}</p>
//     </div>
//   );
// }


















// import { notFound } from "next/navigation";

// // Fetch all videos and find the one matching the slug
// async function getVideo(slug) {
//   try {
//     const response = await fetch("http://localhost:3000/api/list", {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch video data");
//     }

//     const data = await response.json();
//     if (!data.items || data.items.length === 0) {
//       return null;
//     }

//     return data.items.find((video) => video.slug === slug) || null;
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     return null;
//   }
// }

// export default async function WatchPage({ params }) {
//   const video = await getVideo(params.slug);

//   if (!video) {
//     return notFound();
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="aspect-video relative mb-4">
//         <iframe
//           src={`https://short.icu/${video.slug}`}
//           className="absolute inset-0 w-full h-full"
//           allowFullScreen
//         />
//       </div>
//       <h1 className="text-2xl font-bold mb-2">{video.name}</h1>
//       <p className="text-gray-600">Resolution: {video.resolution}p</p>
//       <p className="text-gray-500">Status: {video.status}</p>
//     </div>
//   );
// }








// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import StructuredData from "../../../components/structured-data"; 
// import Link from "next/link";

// // Fetch all videos and find the one matching the slug
// async function getVideo(slug) {
//   if (!slug) return null; // Prevent fetch if slug is undefined

//   try {
//     const response = await fetch("http://localhost:3000/api/list", { cache: "no-store" });

//     if (!response.ok) throw new Error("Failed to fetch video data");

//     const data = await response.json();
//     return data.items?.find((video) => video.slug === slug) || null;
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     return null;
//   }
// }

// // Fetch all videos for recommendations
// async function getAllVideos() {
//   try {
//     const response = await fetch("http://localhost:3000/api/list", { cache: "no-store" });

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
//         router.push("/404"); // Redirect to 404 page if video not found
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

//   // Shuffle recommended videos every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       shuffleVideos(recommended);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [recommended]);

//   function shuffleVideos(videos) {
//     const shuffled = [...videos].sort(() => Math.random() - 0.5);
//     setRecommended(shuffled.slice(0, 4)); // Show only 4 recommended videos
//   }

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;

//   const jsonLd = JSON.stringify({
//     "@context": "https://schema.org",
//     "@type": "VideoObject",
//     "name": video.name,
//     "description": video.description || "No description available",
//     "thumbnailUrl": video.thumbnail || "",
//     "uploadDate": video.uploadDate || "",
//     "duration": video.duration || "",
//     "contentUrl": `https://short.icu/${video.slug}`,
//   });

//   return (
//     <>
//     <StructuredData video={video} /> 
//     <div className="container mx-auto py-8 px-4">
//       {/* Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
//       >
//         ← Back
//       </button>

//       {/* Video Player */}
//       <div className="aspect-video relative mb-4">
//         <iframe
//           src={`https://short.icu/${video.slug}`}
//           className="absolute inset-0 w-full h-full"
//           allowFullScreen
//         />
//       </div>

//       {/* <h1 className="text-2xl font-bold mb-2">{video.name}</h1> */}
//       <h1 className="text-2xl font-bold mb-2">{video.name.replace(/\.[^/.]+$/, "")}</h1>
//       <p className="text-gray-600">Resolution: {video.resolution}p</p>
//       <p className="text-gray-500">Status: {video.status}</p>

//       {/* Recommended Videos Section */}
//       <h2 className="text-xl font-bold mt-8 mb-4">Recommended Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {recommended.map((recVideo, index) => (
//           <Link key={index} href={`/watch/${recVideo.slug}`}>
//             <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 <iframe
//                   src={`https://short.icu/${recVideo.slug}`}
//                   title={recVideo.name}
//                   allowFullScreen
//                   className="w-full h-full"
//                 ></iframe>
//               </div>
//               <h3 className="mt-2 text-lg font-semibold">
//                 {recVideo.name.replace(/\.[^/.]+$/, "")}
//               </h3>

//               <p className="text-sm text-gray-400">Status: {recVideo.status}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

// Fetch video data
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

// Fetch all videos for recommendations
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

export default function WatchPage({ params }) {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params || !params.slug) {
      console.error("Invalid video slug");
      return;
    }

    async function fetchVideoData() {
      setLoading(true);
      const videoData = await getVideo(params.slug);

      if (!videoData) {
        router.push("/404");
        return;
      }

      setVideo(videoData);
      const allVideos = await getAllVideos();
      const filteredVideos = allVideos.filter((v) => v.slug !== params.slug);
      shuffleVideos(filteredVideos);

      setLoading(false);
    }

    fetchVideoData();
  }, [params.slug]);

  function shuffleVideos(videos) {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setRecommended(shuffled.slice(0, 4));
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ✅ SEO Metadata */}
      <Head>
        <title>{video.name.replace(/\.[^/.]+$/, "")} | Watch Now</title>
        <meta name="description" content={`${video.name.replace(/\.[^/.]+$/, "")} - Watch in ${video.resolution}p quality. Status: ${video.status}.`} />
        <meta name="keywords" content="video streaming, free videos, online movies, latest videos, trending videos, watch now" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={video.name.replace(/\.[^/.]+$/, "")} />
        <meta property="og:description" content={`Watch ${video.name.replace(/\.[^/.]+$/, "")} in ${video.resolution}p.`} />
        <meta property="og:image" content={`https://short.icu/thumbnails/${video.slug}.jpg`} />
        <meta property="og:url" content={`https://yourwebsite.com/watch/${video.slug}`} />
        <meta property="og:type" content="video.movie" />

        {/* Twitter Card for better ranking on Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={video.name.replace(/\.[^/.]+$/, "")} />
        <meta name="twitter:description" content={`Watch ${video.name.replace(/\.[^/.]+$/, "")} in ${video.resolution}p.`} />
        <meta name="twitter:image" content={`https://short.icu/thumbnails/${video.slug}.jpg`} />
      </Head>

      {/* ✅ Structured Data Component (as per your format) */}
      {/* <StructuredData video={video} /> */}

      {/* Back Button */}
      <button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
        ← Back
      </button>

      {/* Video Player */}
      <div className="aspect-video relative mb-4">
        <iframe src={`https://short.icu/${video.slug}`} className="absolute inset-0 w-full h-full" allowFullScreen />
      </div>

      <h1 className="text-2xl font-bold mb-2">{video.name.replace(/\.[^/.]+$/, "")}</h1>
      <p className="text-gray-600">Resolution: {video.resolution}p</p>
      <p className="text-gray-500">Status: {video.status}</p>

      {/* Recommended Videos */}
      <h2 className="text-xl font-bold mt-8 mb-4">Recommended Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.map((recVideo, index) => (
          <Link key={index} href={`/watch/${recVideo.slug}`}>
            <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <iframe src={`https://short.icu/${recVideo.slug}`} title={recVideo.name} allowFullScreen className="w-full h-full"></iframe>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{recVideo.name.replace(/\.[^/.]+$/, "")}</h3>
              <p className="text-sm text-gray-400">Status: {recVideo.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
