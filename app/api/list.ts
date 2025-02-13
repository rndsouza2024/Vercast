import { NextResponse } from "next/server";

// ✅ Authenticate and get session cookie
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

// ✅ Fetch video list from Hydrax API
export async function GET(req: Request) {
  try {
    // Step 1: Authenticate
    const authCookie = await authenticateAbyss();

    // Step 2: Fetch video list
    const response = await fetch("https://api.hydrax.net/8162132ce5ca12ec2f06124d577cb23a/list", {
      method: "GET",
      headers: { Cookie: authCookie },
    });

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch video list: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
