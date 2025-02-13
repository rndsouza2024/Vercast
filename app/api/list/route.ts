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

// // ✅ Fetch video list from Hydrax API
// export async function GET() {
//   try {
//     const authCookie = await authenticateAbyss();

//     const response = await fetch("https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list", {
//       method: "GET",
//       headers: { Cookie: authCookie },
//     });

//     if (!response.ok) {
//       throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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

// // ✅ Fetch ALL video pages from Hydrax API
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

//     allVideos = [...allVideos, ...data.items];

//     if (!data.pagination || data.pagination.next === 0) {
//       break; // Stop if there are no more pages
//     }

//     currentPage++;
//   }

//   return allVideos;
// }

// // ✅ API Route: Fetch all videos
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













//working fine code



import { NextResponse } from "next/server";

// ✅ Authenticate with Abyss
async function authenticateAbyss() {
  const response = await fetch("https://abyss.to/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "dsouzarnd@gmail.com",
      password: "Navinjoyjeff131977",
    }),
  });

  if (!response.ok) {
    throw new Error("❌ Authentication with Abyss failed");
  }

  const authCookie = response.headers.get("set-cookie");
  if (!authCookie) {
    throw new Error("❌ No authentication cookie received");
  }

  console.log("✅ Abyss authentication successful");
  return authCookie;
}

// ✅ Fetch ALL video pages from Hydrax API and remove deleted videos
async function fetchAllVideos(authCookie) {
  let allVideos = [];
  let currentPage = 1;

  while (true) {
    const response = await fetch(
      `https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list?page=${currentPage}`,
      {
        method: "GET",
        headers: { Cookie: authCookie },
      }
    );

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      break; // No more videos to fetch
    }

    // ✅ Filter out deleted videos (Only keep videos with status "Ready")
    const availableVideos = data.items.filter(video => video.status === "Ready");

    allVideos = [...allVideos, ...availableVideos];

    if (!data.pagination || data.pagination.next === 0) {
      break; // Stop if there are no more pages
    }

    currentPage++;
  }

  return allVideos;
}

// ✅ API Route: Fetch only available videos
export async function GET() {
  try {
    const authCookie = await authenticateAbyss();
    const videos = await fetchAllVideos(authCookie);

    return NextResponse.json({ items: videos });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
    













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

// // ✅ Fetch ALL video pages from Hydrax API
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
//       break;
//     }

//     // ✅ Filter videos: Only keep those marked as "Ready"
//     const availableVideos = data.items.filter((video) => video.status === "Ready");
//     allVideos = [...allVideos, ...availableVideos];

//     if (!data.pagination || data.pagination.next === 0) {
//       break;
//     }

//     currentPage++;
//   }

//   return allVideos;
// }

// // ✅ API Route
// export const revalidate = 0; // Always fetch fresh data

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
