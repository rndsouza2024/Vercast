
"use server";

import { NextResponse } from "next/server";

const repoOwner = "rndsouza2024";
const repoName = "info";
const filePath = "info.json";
const token = process.env.GITHUB_TOKEN;

// Abyss authentication function
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

// Fetch existing metadata from GitHub JSON
async function fetchMetadata() {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return {}; // Return empty if file doesn't exist

  const fileData = await response.json();
  const content = Buffer.from(fileData.content, "base64").toString(); // Decode base64
  return JSON.parse(content); // Convert JSON string to object
}

// Update GitHub JSON with new metadata
async function updateMetadata(newData: any) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  // Fetch existing data
  const existingData = await fetchMetadata();

  // Merge new data
  const updatedData = { ...existingData, ...newData };
  const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64");

  // Get file SHA (needed for GitHub updates)
  const getFileResponse = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const fileData = await getFileResponse.json();
  const sha = fileData.sha;

  // Push updated JSON to GitHub
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Update metadata",
      content: updatedContent,
      sha: sha,
    }),
  });

  return response.ok;
}

// Upload a file to GitHub (for storing thumbnails)
async function uploadToGitHub(fileName: string, fileBuffer: Buffer, mimeType: string) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/thumbnails/${fileName}`;

  // Convert file to Base64
  const base64Content = fileBuffer.toString("base64");

  // Get SHA if file exists
  let sha = "";
  const getFileResponse = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (getFileResponse.ok) {
    const fileData = await getFileResponse.json();
    sha = fileData.sha;
  }

  // Upload file
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Upload ${fileName}`,
      content: base64Content,
      sha: sha || undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`❌ Failed to upload ${fileName} to GitHub`);
  }

  return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/thumbnails/${fileName}`;
}

// **Upload API**
export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    // **Step 1: Authenticate with Abyss**
    const authCookie = await authenticateAbyss();

    // **Step 2: Extract file and metadata from request**
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title");
    const description = formData.get("description");
    const thumbnail = formData.get("thumbnail") as File;

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid or missing file" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`✅ Received file: ${file.name} (${buffer.length} bytes)`);

    // **Step 3: Upload file to Hydrax**
    const hydraxForm = new FormData();
    hydraxForm.append("file", new Blob([buffer], { type: file.type }), file.name);

    const uploadResponse = await fetch(
      "http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a",
      {
        method: "POST",
        headers: { Cookie: authCookie },
        body: hydraxForm,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error(`❌ Upload failed: ${uploadResponse.statusText}`);
    }

    const data = await uploadResponse.json();
    const videoUrl = `https://short.icu/${data.slug}`;

    console.log("✅ File uploaded successfully:", data);

    // **Step 4: Upload thumbnail to GitHub (if provided)**
    let thumbnailUrl = "";
    if (thumbnail) {
      const arrayBuffer = await thumbnail.arrayBuffer();
      const thumbnailBuffer = Buffer.from(arrayBuffer);
      const fileName = `${file.name}.jpg`; // Store as JPEG in GitHub
      thumbnailUrl = await uploadToGitHub(fileName, thumbnailBuffer, thumbnail.type);
    }

    // **Step 5: Store video metadata in GitHub JSON**
    const newMetadata = {
      [file.name]: {
        title,
        description,
        thumbnailUrl,
        videoUrl,
      },
    };

    const success = await updateMetadata(newMetadata);
    if (!success) {
      return NextResponse.json({ success: false, message: "Failed to update GitHub" });
    }

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      videoUrl,
      metadata: newMetadata,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// **Fetch Uploaded Data API**
export async function GET() {
  try {
    const metadata = await fetchMetadata();
    return NextResponse.json({ success: true, data: metadata });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}





