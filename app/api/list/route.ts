// import { NextResponse } from "next/server"

// const repoOwner = "rndsouza2024"
// const repoName = "info"
// const filePath = "info.json"
// const token = process.env.GITHUB_TOKEN

// if (!token) {
//   console.error("❌ GitHub token is missing")
// }

// // Fetch metadata from GitHub
// async function fetchMetadata() {
//   try {
//     const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })

//     if (response.status === 404) {
//       console.warn("⚠️ Metadata file not found, creating new one")
//       return {}
//     }

//     if (!response.ok) {
//       throw new Error(`GitHub API error: ${response.statusText}`)
//     }

//     const data = await response.json()
//     const content = Buffer.from(data.content, "base64").toString("utf-8")
//     return JSON.parse(content)
//   } catch (error) {
//     console.error("❌ Error fetching metadata:", error)
//     return {}
//   }
// }

// // Update metadata in GitHub
// async function updateMetadata(newData: any) {
//   try {
//     const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`

//     // Get existing file (if any) to get its SHA
//     let sha
//     try {
//       const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.ok) {
//         const data = await response.json()
//         sha = data.sha
//       }
//     } catch (error) {
//       console.warn("⚠️ File doesn't exist yet")
//     }

//     // Prepare the update
//     const content = Buffer.from(JSON.stringify(newData, null, 2)).toString("base64")
//     const body: any = {
//       message: "Update video metadata",
//       content,
//     }
//     if (sha) body.sha = sha

//     // Update the file
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to update metadata: ${response.statusText}`)
//     }

//     return true
//   } catch (error) {
//     console.error("❌ Error updating metadata:", error)
//     return false
//   }
// }

// // ✅ Authenticate with Abyss
// async function authenticateAbyss() {
//   const response = await fetch("https://abyss.to/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: "dsouzarnd@gmail.com",
//       password: "Navinjoyjeff131977",
//     }),
//   })

//   if (!response.ok) {
//     throw new Error("❌ Authentication with Abyss failed")
//   }

//   const authCookie = response.headers.get("set-cookie")
//   if (!authCookie) {
//     throw new Error("❌ No authentication cookie received")
//   }

//   console.log("✅ Abyss authentication successful")
//   return authCookie
// }

// // ✅ Fetch ALL video pages from Hydrax API and remove deleted videos
// async function fetchAllVideos(authCookie) {
//   let allVideos = []
//   let currentPage = 1

//   while (true) {
//     const response = await fetch(`https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list?page=${currentPage}`, {
//       method: "GET",
//       headers: { Cookie: authCookie },
//     })

//     if (!response.ok) {
//       throw new Error(`❌ Failed to fetch video list: ${response.statusText}`)
//     }

//     const data = await response.json()
//     if (!data.items || data.items.length === 0) {
//       break // No more videos to fetch
//     }

//     // ✅ Filter out deleted videos (Only keep videos with status "Ready")
//     const availableVideos = data.items.filter((video) => video.status === "Ready")
//     allVideos = [...allVideos, ...availableVideos]

//     if (!data.pagination || data.pagination.next === 0) {
//       break // Stop if there are no more pages
//     }

//     currentPage++
//   }

//   return allVideos
// }

// // ✅ API Route: Fetch videos with metadata
// export async function GET() {
//   try {
//     // Fetch videos from Hydrax
//     const authCookie = await authenticateAbyss()
//     const videos = await fetchAllVideos(authCookie)

//     // Fetch metadata from GitHub
//     const metadata = await fetchMetadata()

//     // Merge video data with metadata
//     const enrichedVideos = videos.map((video) => ({
//       ...video,
//       ...metadata[video.slug],
//     }))

//     return NextResponse.json({ items: enrichedVideos })
//   } catch (error) {
//     console.error("❌ Fetch error:", error)
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 })
//   }
// }

// // ✅ Handle POST requests to update metadata
// export async function POST(req: Request) {
//   try {
//     const data = await req.json()
//     const success = await updateMetadata(data)

//     if (!success) {
//       return NextResponse.json({ success: false, message: "Failed to update metadata" }, { status: 500 })
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("❌ Error updating metadata:", error)
//     return NextResponse.json({ success: false, message: "Failed to process request" }, { status: 500 })
//   }
// }
















// import { NextResponse } from "next/server";

// // ✅ Authenticate with Abyss
// async function authenticateAbyss() {
//   const response = await fetch("https://abyss.to/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: "dsouzarnd@gmail.com",
//       password: "Navinjoyjeff131977",
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("❌ Authentication with Abyss failed");
//   }

//   const authCookie = response.headers.get("set-cookie");
//   if (!authCookie) {
//     throw new Error("❌ No authentication cookie received");
//   }

//   console.log("✅ Abyss authentication successful");
//   return authCookie;
// }

// // ✅ Fetch ALL video pages from Hydrax API and remove deleted videos
// async function fetchAllVideos(authCookie) {
//   let allVideos = [];
//   let currentPage = 1;

//   while (true) {
//     const response = await fetch(
//       `https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list?page=${currentPage}`,
//       {
//         method: "GET",
//         headers: { Cookie: authCookie },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);
//     }

//     const data = await response.json();
//     if (!data.items || data.items.length === 0) {
//       break; // No more videos to fetch
//     }

//     // ✅ Filter out deleted videos (Only keep videos with status "Ready")
//     const availableVideos = data.items.filter(video => video.status === "Ready");

//     allVideos = [...allVideos, ...availableVideos];

//     if (!data.pagination || data.pagination.next === 0) {
//       break; // Stop if there are no more pages
//     }

//     currentPage++;
//   }

//   return allVideos;
// }

// // ✅ API Route: Fetch only available videos
// export async function GET() {
//   try {
//     const authCookie = await authenticateAbyss();
//     const videos = await fetchAllVideos(authCookie);

//     return NextResponse.json({ items: videos });
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
    




















import { NextResponse } from "next/server";

const HYDRAX_API = "https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list";
const ABYSS_LOGIN = "https://abyss.to/login";

// ✅ Authenticate with Abyss
async function authenticateAbyss() {
  const response = await fetch(ABYSS_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "dsouzarnd@gmail.com",
      password: "Navinjoyjeff131977",
    }),
  });

  if (!response.ok) throw new Error("❌ Authentication with Abyss failed");

  const authCookie = response.headers.get("set-cookie");
  if (!authCookie) throw new Error("❌ No authentication cookie received");

  console.log("✅ Abyss authentication successful");
  return authCookie;
}

// ✅ Fetch ALL video pages from Hydrax API (Force real-time data)
async function fetchAllVideos(authCookie: string) {
  let allVideos = [];
  let currentPage = 1;

  while (true) {
    const response = await fetch(`${HYDRAX_API}?page=${currentPage}&timestamp=${Date.now()}`, {
      method: "GET",
      headers: { 
        Cookie: authCookie, 
        "Cache-Control": "no-cache, no-store, must-revalidate" 
      },
    });

    if (!response.ok) throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);

    const data = await response.json();
    if (!data.items || data.items.length === 0) break; // No more videos to fetch

    // ✅ Filter out deleted videos (Only keep videos with status "Ready")
    const availableVideos = data.items.filter(video => video.status === "Ready");

    allVideos = [...allVideos, ...availableVideos];

    if (!data.pagination || data.pagination.next === 0) break; // No more pages

    currentPage++;
  }

  return allVideos;
}

// ✅ API Route: Fetch Real-Time Video Data
export async function GET() {
  try {
    const authCookie = await authenticateAbyss();
    const videos = await fetchAllVideos(authCookie);

    // ✅ If no videos exist, return an empty list
    if (videos.length === 0) {
      console.log("🚨 No videos available. Returning empty response.");
      return NextResponse.json({ success: true, items: [] });
    }

    return NextResponse.json({ success: true, items: videos });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
