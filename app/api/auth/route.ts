// app/api/auth/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://abyss.to/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.ABYSS_EMAIL,
        password: process.env.ABYSS_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${errorText}`);
    }

    const authCookie = response.headers.get("set-cookie");
    if (!authCookie) throw new Error("No authentication cookie received");

    return NextResponse.json({ cookie: authCookie });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}