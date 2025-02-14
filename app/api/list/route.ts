
// import { NextResponse } from "next/server";

// const HYDRAX_API = "https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list";
// const ABYSS_LOGIN = "https://abyss.to/login";

// // ✅ Authenticate with Abyss
// async function authenticateAbyss() {
//   const response = await fetch(ABYSS_LOGIN, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: "dsouzarnd@gmail.com",
//       password: "Navinjoyjeff131977",
//     }),
//   });

//   if (!response.ok) throw new Error("❌ Authentication with Abyss failed");

//   const authCookie = response.headers.get("set-cookie");
//   if (!authCookie) throw new Error("❌ No authentication cookie received");

//   console.log("✅ Abyss authentication successful");
//   return authCookie;
// }

// // ✅ Fetch ALL video pages from Hydrax API (Force real-time data)
// async function fetchAllVideos(authCookie: string) {
//   let allVideos = [];
//   let currentPage = 1;

//   while (true) {
//     const response = await fetch(`${HYDRAX_API}?page=${currentPage}&timestamp=${Date.now()}`, {
//       method: "GET",
//       headers: { 
//         Cookie: authCookie, 
//         "Cache-Control": "no-cache, no-store, must-revalidate" 
//       },
//     });

//     if (!response.ok) throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);

//     const data = await response.json();
//     if (!data.items || data.items.length === 0) break; // No more videos to fetch

//     // ✅ Filter out deleted videos (Only keep videos with status "Ready")
//     const availableVideos = data.items.filter(video => video.status === "Ready");

//     allVideos = [...allVideos, ...availableVideos];

//     if (!data.pagination || data.pagination.next === 0) break; // No more pages

//     currentPage++;
//   }

//   return allVideos;
// }

// // ✅ API Route: Fetch Real-Time Video Data
// export async function GET() {
//   try {
//     const authCookie = await authenticateAbyss();
//     const videos = await fetchAllVideos(authCookie);

//     // ✅ If no videos exist, return an empty list
//     if (videos.length === 0) {
//       console.log("🚨 No videos available. Returning empty response.");
//       return NextResponse.json({ success: true, items: [] });
//     }

//     return NextResponse.json({ success: true, items: videos });
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";

const HYDRAX_API = "https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list";
const ABYSS_LOGIN = "https://abyss.to/login";

// ✅ Authenticate with Abyss (No Cache)
async function authenticateAbyss() {
  const response = await fetch(ABYSS_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "dsouzarnd@gmail.com",
      password: "Navinjoyjeff131977",
    }),
    cache: "no-store", // ✅ Ensure fresh authentication request
  });

  if (!response.ok) throw new Error("❌ Authentication with Abyss failed");

  const authCookie = response.headers.get("set-cookie");
  if (!authCookie) throw new Error("❌ No authentication cookie received");

  console.log("✅ Abyss authentication successful");
  return authCookie;
}

// ✅ Fetch ALL video pages from Hydrax API (Force fresh data)
async function fetchAllVideos(authCookie: string) {
  let allVideos = [];
  let currentPage = 1;

  while (true) {
    const response = await fetch(`${HYDRAX_API}?page=${currentPage}&timestamp=${Date.now()}`, {
      method: "GET",
      headers: { 
        Cookie: authCookie, 
        "Cache-Control": "no-cache, no-store, must-revalidate" // ✅ Force fresh data
      },
      cache: "no-store", // ✅ No caching in Next.js API routes
    });

    if (!response.ok) throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);

    const data = await response.json();
    if (!data.items || data.items.length === 0) break; // ✅ No more videos to fetch

    // ✅ Remove deleted videos (Only keep videos with status "Ready")
    const availableVideos = data.items.filter(video => video.status === "Ready");

    allVideos = [...allVideos, ...availableVideos];

    if (!data.pagination || data.pagination.next === 0) break; // ✅ Stop when there are no more pages

    currentPage++;
  }

  return allVideos;
}

// ✅ API Route: Fetch Real-Time Video Data
export async function GET() {
  try {
    const authCookie = await authenticateAbyss();
    const videos = await fetchAllVideos(authCookie);

    // ✅ Ensure deleted videos are removed in real-time
    console.log(`✅ Retrieved ${videos.length} videos from Hydrax`);

    return NextResponse.json(
      { success: true, items: videos },
      { headers: { "Cache-Control": "no-store, must-revalidate" } } // ✅ Prevent Vercel caching
    );
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export const revalidate = 0; // ✅ Forces real-time updates in Vercel deployment
