"use server";

import { NextResponse } from "next/server";

const repoOwner = "rndsouza2024";
const repoName = "info";
const filePath = "info.json";
const token = process.env.GITHUB_TOKEN;

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

  return authCookie;
}

export async function POST(req: Request) {
  try {
    const authCookie = await authenticateAbyss();
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const hydraxForm = new FormData();
    hydraxForm.append("file", new Blob([fileBuffer], { type: file.type }), file.name);

    const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
      method: "POST",
      headers: { Cookie: authCookie },
      body: hydraxForm,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const data = await uploadResponse.json();
    return NextResponse.json({ success: true, videoUrl: `https://short.icu/${data.slug}` });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
