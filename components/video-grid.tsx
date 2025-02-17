// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"

// export function VideoGrid() {
//   const [videoList, setVideoList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true)

//         // Get base URL from environment or use current origin
//         const baseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin
//         const response = await fetch(`${baseUrl}/api/list`)

//         if (!response.ok) {
//           throw new Error(`Failed to fetch videos: ${response.statusText}`)
//         }

//         const data = await response.json()
//         if (!data.items || !Array.isArray(data.items)) {
//           throw new Error("Invalid response format")
//         }

//         setVideoList(data.items)
//       } catch (err) {
//         console.error("Error fetching videos:", err)
//         setError(err instanceof Error ? err.message : "Failed to load videos")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchVideos()
//   }, [])

//   if (loading) return <p className="text-center text-gray-500">Loading videos...</p>
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>
//   if (!videoList.length) return <p className="text-center text-gray-500">No videos uploaded yet.</p>

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {videoList.map((video, index) => (
//           <div key={index} className="group p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
//             <Link href={`/watch/${video.slug}`}>
//               <div className="cursor-pointer">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   <iframe
//                     src={`https://short.icu/${video.slug}`}
//                     title={video.title || video.name}
//                     allowFullScreen
//                     className="w-full h-full"
//                   ></iframe>
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold">{(video.title || video.name).replace(/\.[^/.]+$/, "")}</h3>
//                 {video.description && <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>}
//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//               </div>
//             </Link>

//             <Link href={`/watch/${video.slug}`}>
//               <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">
//                 ▶ Watch Now
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
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
//           <div key={index} className="group p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
//             <Link href={`/watch/${video.slug}`}>
//               <div className="cursor-pointer">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   {/* ✅ Embedded iframe for video */}
//                   <iframe
//                     src={video.videoUrl}
//                     title={video.title}
//                     allowFullScreen
//                     className="w-full h-full"
//                   ></iframe>
//                 </div>
//                 {/* <h3 className="mt-2 text-lg font-semibold">{video.title}</h3> */}
//                 <h3 className="mt-2 text-lg font-semibold">
//                   {video.title.replace(/\.[^/.]+$/, "")}
//                 </h3>

//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//               </div>
//             </Link>

//             {/* ✅ Watch Now Button (Uses the correct link format) */}
//             <Link href={`/watch/${video.slug}`}>
//               <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">
//                 ▶ Watch Now
//               </button>
//             </Link>
//           </div>
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

//         // ✅ Fetch `info.json` directly from GitHub
//         let githubData = {};
//         try {
//           const githubResponse = await fetch("https://raw.githubusercontent.com/rndsouza2024/info/main/info.json");
//           if (githubResponse.ok) {
//             githubData = await githubResponse.json();
//           } else {
//             console.warn(`Warning: GitHub responded with ${githubResponse.status}`);
//           }
//         } catch (githubError) {
//           console.warn("❌ Failed to fetch GitHub info.json:", githubError);
//         }

//         console.log("📌 GitHub Data:", githubData); // ✅ Debugging

//         // ✅ Merge GitHub data with API list data
//         const mergedVideos = listData.items.map((video) => {
//           const githubInfo =
//             githubData[video.name] || // Try matching with the full filename
//             githubData[`${video.name}.mp4`] || // Try matching with ".mp4"
//             {}; // Default to empty object if no match

//           console.log("🔎 Matching Video:", video.name, githubInfo); // ✅ Debugging

//           return {
//             ...video,
//             title: githubInfo?.title || video.name,
//             description: githubInfo?.description || "No description available",
//             thumbnailUrl: githubInfo?.thumbnailUrl || "", // Use the thumbnail URL from GitHub
//             videoUrl: `https://short.icu/${video.slug}`, // ✅ Video embed URL
//           };
//         });

//         setVideoList(mergedVideos);
//       } catch (err) {
//         console.error("❌ Error fetching videos:", err);
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
//           <div key={index} className="group p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
//             <Link href={`/watch/${video.slug}`}>
//               <div className="cursor-pointer">
//                 <div className="aspect-video relative overflow-hidden rounded-lg">
//                   {/* ✅ Display Thumbnail Image from GitHub */}
//                   {video.thumbnailUrl ? (
//                     <Image
//                       src={video.thumbnailUrl}
//                       alt={video.title}
//                       width={320} // Adjust size as needed
//                       height={180}
//                       className="rounded-lg"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full">
//                       ❌ No Thumbnail Available
//                     </div>
//                   )}
//                 </div>
//                 <h3 className="mt-2 text-lg font-semibold">{video.title.replace(/\.[^/.]+$/, "")}</h3>
//                 <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
//                 <p className="text-sm text-gray-400">Status: {video.status}</p>
//               </div>
//             </Link>

//             {/* ✅ Watch Now Button */}
//             <Link href={`/watch/${video.slug}`}>
//               <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition">
//                 ▶ Watch Now
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

////IMAGE ADDED 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

        // ✅ Fetch `info.json` directly from GitHub
        let githubData = {};
        try {
          const githubResponse = await fetch("https://raw.githubusercontent.com/rndsouza2024/info/main/info.json");
          if (githubResponse.ok) {
            githubData = await githubResponse.json();
          } else {
            console.warn(`Warning: GitHub responded with ${githubResponse.status}`);
          }
        } catch (githubError) {
          console.warn("❌ Failed to fetch GitHub info.json:", githubError);
        }

        console.log("📌 GitHub Data:", githubData); // ✅ Debugging

        // ✅ Merge GitHub data with API list data
        const mergedVideos = listData.items.map((video) => {
          const githubInfo =
            githubData[video.name] || // Try matching with the full filename
            githubData[`${video.name}.mp4`] || // Try matching with ".mp4"
            {}; // Default to empty object if no match

          console.log("🔎 Matching Video:", video.name, githubInfo); // ✅ Debugging

          return {
            ...video,
            title: githubInfo?.title || video.name,
            description: githubInfo?.description || "No description available",
            thumbnailUrl: githubInfo?.thumbnailUrl || "", // Use the thumbnail URL from GitHub
            videoUrl: `https://short.icu/${video.slug}`, // ✅ Video embed URL
          };
        });

        setVideoList(mergedVideos);
      } catch (err) {
        console.error("❌ Error fetching videos:", err);
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
                  {/* ✅ Display Thumbnail Image from GitHub */}
                  {video.thumbnailUrl ? (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      width={320} // Adjust size as needed
                      height={180}
                      layout="responsive"
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full">
                      ❌ No Thumbnail Available
                    </div>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{video.title.replace(/\.[^/.]+$/, "")}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
                <p className="text-sm text-gray-400">Status: {video.status}</p>
              </div>
            </Link>

            {/* ✅ Watch Now Button */}
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

//         // ✅ Fetch video metadata from Abyss.to
//         const listResponse = await fetch("/api/list", { method: "GET" });
//         if (!listResponse.ok) throw new Error(`Failed to fetch /api/list: ${listResponse.statusText}`);
//         const listData = await listResponse.json();

//         if (!listData.items || !Array.isArray(listData.items)) {
//           throw new Error("Invalid response format from /api/list");
//         }

//         // ✅ Fetch additional metadata from GitHub
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

//         // ✅ Merge GitHub metadata with video list
//         const mergedVideos = listData.items.map((video) => {
//           const githubInfo = githubData[video.slug] || {}; // Match by slug
//           return {
//             ...video,
//             title: githubInfo.title || video.name,
//             description: githubInfo.description || "No description available",
//             videoUrl: `https://short.icu/${video.slug}`,
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
//             <div className="p-4 border rounded-lg shadow-md">
//               <iframe src={video.videoUrl} allowFullScreen className="w-full aspect-video"></iframe>
//               <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
