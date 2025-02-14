// import Link from "next/link"
// import Image from "next/image"

// export function VideoGrid({ videos }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {videos.map((video) => (
//         <Link key={video.slug} href={`/watch/${video.slug}`}>
//           <div className="group cursor-pointer">
//             <div className="aspect-video relative overflow-hidden rounded-lg">
//               <Image
//                 src={video.thumbnailUrl || "/placeholder.svg"}
//                 alt={video.title}
//                 layout="fill"
//                 objectFit="cover"
//                 className="transition-transform group-hover:scale-105"
//               />
//             </div>
//             <h3 className="mt-2 text-lg font-semibold line-clamp-2">{video.title}</h3>
//             <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }



// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid({ videos }) {
//   if (!videos || videos.length === 0) {
//     return <p className="text-center text-gray-500">No videos uploaded yet.</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {videos.map((video, index) => {
//         // ✅ Fallback values to prevent errors
//         const slug = video?.slug || `video-${index}`;
//         const thumbnailUrl = video?.thumbnailUrl || "/placeholder.svg";
//         const title = video?.title || "Untitled Video";
//         const description = video?.description || "No description available.";

//         return (
//           <Link key={slug} href={`/watch/${slug}`}>
//             <div className="group cursor-pointer">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 <Image
//                   src={thumbnailUrl}
//                   alt={title}
//                   layout="fill"
//                   objectFit="cover"
//                   className="transition-transform group-hover:scale-105"
//                 />
//               </div>
//               <h3 className="mt-2 text-lg font-semibold line-clamp-2">{title}</h3>
//               <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }





















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch video list from our API route
//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/list");
//         const data = await response.json();

//         if (!data.items) {
//           throw new Error(data.msg || "Failed to fetch videos");
//         }

//         setVideos(data.items); // ✅ Store video list
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   // Loading & error state
//   if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;
//   if (error) return <p className="text-center text-red-500">❌ {error}</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videos.map((video, index) => {
//           const slug = video.slug; // ✅ Correct slug from API response
//           const embedUrl = `https://short.icu/${slug}`;
//           const thumbnailUrl = `/placeholder.svg`; // 🔧 Replace with actual thumbnail URL if available

//           return (
//             <Link key={index} href={embedUrl} target="_blank">
//               <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   <Image
//                     src={thumbnailUrl}
//                     alt={video.name}
//                     width={640}
//                     height={360}
//                     className="transition-transform group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold line-clamp-2">{video.name}</h3>
//                 <p className="text-sm text-gray-500">Resolution: {video.resolution}p</p>
//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//                 <p className="text-xs text-blue-500">
//                   <a href={embedUrl} target="_blank">🔗 Watch Video</a>
//                 </p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch video list from API
//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/list");
//         const data = await response.json();

//         if (!data.items) {
//           throw new Error(data.msg || "Failed to fetch videos");
//         }

//         setVideos(data.items);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;
//   if (error) return <p className="text-center text-red-500">❌ {error}</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videos.map((video, index) => {
//           return (
//             <Link key={index} href={`/watch/${video.slug}`}>
//               <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   <Image
//                     src="/placeholder.svg" // Replace with actual thumbnail if available
//                     alt={video.name}
//                     width={640}
//                     height={360}
//                     className="transition-transform group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold line-clamp-2">{video.name}</h3>
//                 <p className="text-sm text-gray-500">Resolution: {video.resolution}p</p>
//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid({ videos }) {
//   const [videoList, setVideoList] = useState(videos);

//   useEffect(() => {
//     async function fetchVideos() {
//       const response = await fetch("/api/list");
//       const data = await response.json();

//       if (data.items) {
//         setVideoList(data.items);
//       }
//     }

//     fetchVideos();
//   }, []);

//   if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videoList.map((video, index) => (
//           <Link key={index} href={`/watch/${video.slug}`}>
//             <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 <Image
//                   src={video.thumbnailUrl || "/placeholder.svg"} 
//                   alt={video.name}
//                   width={640}
//                   height={360}
//                   className="transition-transform group-hover:scale-105"
//                 />
//               </div>
//               <h3 className="mt-2 text-lg font-semibold">{video.name || "Untitled Video"}</h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }




















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid() {
//   const [videoList, setVideoList] = useState([]);

//   useEffect(() => {
//     async function fetchVideos() {
//       const response = await fetch("/api/list");
//       const data = await response.json();

//       if (data.items) {
//         setVideoList(data.items);
//       }
//     }

//     fetchVideos();
//   }, []);

//   if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videoList.map((video, index) => {
//           const embedUrl = `https://short.icu/${video.slug}`;
//           const thumbnailUrl = video.thumbnailUrl || `https://short.icu/${video.slug}?thumbnail=1`;

//           return (
//             <Link key={index} href={`/watch/${video.slug}`}>
//               <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   <Image
//                     src={thumbnailUrl}
//                     alt={video.name}
//                     width={640}
//                     height={360}
//                     className="transition-transform group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold">{video.name}</h3>
//                 <p className="text-sm text-gray-500">Resolution: {video.resolution}p</p>
//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid() {
//   const [videoList, setVideoList] = useState([]);

//   useEffect(() => {
//     async function fetchVideos() {
//       const response = await fetch("/api/list");
//       const data = await response.json();

//       if (data.items) {
//         setVideoList(data.items);
//       }
//     }

//     fetchVideos();
//   }, []);

//   if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videoList.map((video, index) => {
//           const embedUrl = `https://short.icu/${video.slug}`;
//           const userThumbnail = video.thumbnailUrl; // User-defined thumbnail
//           const defaultThumbnail = `https://short.icu/${video.slug}?thumbnail=https://example.com/thumbnail-demo.jpg`; // Corrected default thumbnail URL
//           const thumbnailUrl = userThumbnail || defaultThumbnail; // Use user-defined thumbnail if available, otherwise fallback
//           return (
//             <Link key={index} href={`/watch/${video.slug}`}>
//               <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   <Image
//                     src={thumbnailUrl}
//                     alt={video.name}
//                     width={640}
//                     height={360}
//                     className="transition-transform group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold">{video.name}</h3>
//                 <p className="text-sm text-gray-500">Resolution: {video.resolution}p</p>
//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export function VideoGrid() {
//   const [videoList, setVideoList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true);

//         // ✅ Step 1: Fetch video metadata from /api/list first
//         const listResponse = await fetch("/api/list", { method: "GET" });
//         if (!listResponse.ok) throw new Error(`Failed to fetch /api/list: ${listResponse.statusText}`);
//         const listData = await listResponse.json();

//         if (!listData.items || !Array.isArray(listData.items)) {
//           throw new Error("Invalid response format from /api/list");
//         }

//         // ✅ Step 2: Fetch additional video details from /api/github (if needed)
//         let githubData = {};
//         try {
//           const githubResponse = await fetch("/api/github", { method: "GET" }); // Ensure correct method
//           if (githubResponse.ok) {
//             githubData = await githubResponse.json();
//           } else {
//             console.warn(`Warning: /api/github responded with ${githubResponse.status}`);
//           }
//         } catch (githubError) {
//           console.warn("Failed to fetch /api/github:", githubError);
//         }

//         // ✅ Step 3: Merge GitHub data with API list data
//         const mergedVideos = listData.items.map((video) => {
//           const githubInfo = githubData[video.slug] || {}; // Match by slug
//           return {
//             ...video,
//             title: githubInfo.title || video.name, // Use GitHub title if available
//             description: githubInfo.description || "No description available",
//             thumbnailUrl: githubInfo.thumbnailUrl || `https://short.icu/${video.slug}?thumbnail=https://example.com/thumbnail-demo.jpg`,
//           };
//         });

//         setVideoList(mergedVideos);
//       } catch (err) {
//         console.error("Error fetching videos:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;
//   if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videoList.map((video, index) => (
//           <Link key={index} href={`/watch/${video.slug}`}>
//             <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 <Image
//                   src={video.thumbnailUrl}
//                   alt={video.title}
//                   width={640}
//                   height={360}
//                   className="transition-transform group-hover:scale-105"
//                 />
//               </div>
//               <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
//               <p className="text-sm text-gray-500">{video.description}</p>
//               <p className="text-sm text-gray-400">Status: {video.status}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export function VideoGrid() {
//   const [videoList, setVideoList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true);

//         // ✅ Fetch video metadata from /api/list
//         const listResponse = await fetch("/api/list", { method: "GET" });
//         if (!listResponse.ok) throw new Error(`Failed to fetch /api/list: ${listResponse.statusText}`);
//         const listData = await listResponse.json();

//         if (!listData.items || !Array.isArray(listData.items)) {
//           throw new Error("Invalid response format from /api/list");
//         }

//         // ✅ Fetch additional video details from /api/github
//         let githubData = {};
//         try {
//           const githubResponse = await fetch("/api/github", { method: "GET" });
//           if (githubResponse.ok) {
//             githubData = await githubResponse.json();
//           } else {
//             console.warn(`Warning: /api/github responded with ${githubResponse.status}`);
//           }
//         } catch (githubError) {
//           console.warn("Failed to fetch /api/github:", githubError);
//         }

//         // ✅ Merge GitHub data with API list data
//         const mergedVideos = listData.items.map((video) => {
//           const githubInfo = githubData[video.slug] || {}; // Match by slug
//           return {
//             ...video,
//             title: githubInfo.title || video.name,
//             description: githubInfo.description || "No description available",
//             videoUrl: `https://short.icu/${video.slug}`, // Example embed URL
//           };
//         });

//         setVideoList(mergedVideos);
//       } catch (err) {
//         console.error("Error fetching videos:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;
//   if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>;

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videoList.map((video, index) => (
//           <Link key={index} href={`/watch/${video.slug}`}>
//             <div className="group cursor-pointer p-2 border rounded-lg shadow-md hover:shadow-lg transition">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 {/* ✅ Embedded iframe for video */}
//                 <iframe
//                   src={video.videoUrl}
//                   title={video.title}
//                   allowFullScreen
//                   className="w-full h-full"
//                 ></iframe>
//               </div>
//               <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
//               {/* <p className="text-sm text-gray-500">{video.description}</p> */}
//               <p className="text-sm text-gray-400">Status: {video.status}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }










"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function VideoGrid() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);

        // ✅ Fetch video metadata from /api/list
        const listResponse = await fetch("/api/list", { method: "GET" });
        if (!listResponse.ok) throw new Error(`Failed to fetch /api/list: ${listResponse.statusText}`);
        const listData = await listResponse.json();

        if (!listData.items || !Array.isArray(listData.items)) {
          throw new Error("Invalid response format from /api/list");
        }

        // ✅ Fetch additional video details from /api/github
        let githubData = {};
        try {
          const githubResponse = await fetch("/api/github", { method: "GET" });
          if (githubResponse.ok) {
            githubData = await githubResponse.json();
          } else {
            console.warn(`Warning: /api/github responded with ${githubResponse.status}`);
          }
        } catch (githubError) {
          console.warn("Failed to fetch /api/github:", githubError);
        }

        // ✅ Merge GitHub data with API list data
        const mergedVideos = listData.items.map((video) => {
          const githubInfo = githubData[video.slug] || {}; // Match by slug
          return {
            ...video,
            title: githubInfo.title || video.name,
            description: githubInfo.description || "No description available",
            videoUrl: `https://short.icu/${video.slug}`, // Example embed URL
          };
        });

        setVideoList(mergedVideos);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoList.map((video, index) => (
          <div key={index} className="group p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
            <Link href={`/watch/${video.slug}`}>
              <div className="cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  {/* ✅ Embedded iframe for video */}
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                {/* <h3 className="mt-2 text-lg font-semibold">{video.title}</h3> */}
                <h3 className="mt-2 text-lg font-semibold">
                  {video.title.replace(/\.[^/.]+$/, "")}
                </h3>

                <p className="text-sm text-gray-400">Status: {video.status}</p>
              </div>
            </Link>

            {/* ✅ Watch Now Button (Uses the correct link format) */}
            <Link href={`/watch/${video.slug}`}>
              <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">
                ▶ Watch Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
