
// "use server";

// import { NextResponse } from "next/server";

// const repoOwner = "rndsouza2024";
// const repoName = "info";
// const filePath = "info.json";
// const token = process.env.GITHUB_TOKEN;

// // Fetch existing metadata from GitHub JSON
// async function fetchMetadata(): Promise<Record<string, any>> {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

//   const response = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!response.ok) return {}; // Return empty object if file doesn't exist

//   const fileData = await response.json();
//   const content = Buffer.from(fileData.content, "base64").toString(); // Decode base64
//   return JSON.parse(content); // Convert JSON string to object
// }

// // Update GitHub JSON with new metadata
// async function updateMetadata(fileName: string, newData: any) {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

//   // Fetch existing data
//   const existingData = await fetchMetadata();

//   // Add new structured data (key = filename)
//   const updatedData = { ...existingData, [fileName]: newData };
//   const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64");

//   // Get file SHA (needed for GitHub updates)
//   const getFileResponse = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const fileData = await getFileResponse.json();
//   const sha = fileData.sha;

//   // Push updated JSON to GitHub
//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: "Update video metadata",
//       content: updatedContent,
//       sha: sha,
//     }),
//   });

//   return response.ok;
// }

// // Upload a file to GitHub (for storing thumbnails)
// async function uploadToGitHub(fileName: string, fileBuffer: Buffer) {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/thumbnails/${fileName}.jpg`;

//   // Convert file to Base64
//   const base64Content = fileBuffer.toString("base64");

//   // Get SHA if file exists
//   let sha = "";
//   const getFileResponse = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (getFileResponse.ok) {
//     const fileData = await getFileResponse.json();
//     sha = fileData.sha;
//   }

//   // Upload file
//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: `Upload ${fileName}.jpg`,
//       content: base64Content,
//       sha: sha || undefined,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`❌ Failed to upload ${fileName}.jpg to GitHub`);
//   }

//   return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/thumbnails/${fileName}.jpg`;
// }

// // **Upload API**
// export async function POST(req: Request) {
//   try {
//     if (req.method !== "POST") {
//       return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const videoUrl = formData.get("videoUrl") as string; // URL where the video is stored
//     const thumbnail = formData.get("thumbnail") as File;

//     if (!(file instanceof Blob)) {
//       return NextResponse.json({ error: "Invalid or missing file" }, { status: 400 });
//     }

//     console.log(`✅ Received file: ${file.name}`);

//     const fileName = file.name; // Use filename as JSON key

//     // **Step 1: Upload thumbnail to GitHub (if provided)**
//     let thumbnailUrl = "";
//     if (thumbnail) {
//       const arrayBuffer = await thumbnail.arrayBuffer();
//       const thumbnailBuffer = Buffer.from(arrayBuffer);
//       thumbnailUrl = await uploadToGitHub(fileName, thumbnailBuffer);
//     }

//     // **Step 2: Store video metadata in GitHub JSON**
//     const newMetadata = {
//       title,
//       description,
//       thumbnailUrl,
//       videoUrl,
//     };

//     const success = await updateMetadata(fileName, newMetadata);
//     if (!success) {
//       return NextResponse.json({ success: false, message: "Failed to update GitHub" });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Upload successful",
//       metadata: newMetadata,
//     });
//   } catch (error) {
//     console.error("❌ Upload error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// // **Fetch Metadata API**
// export async function GET() {
//   try {
//     const metadata = await fetchMetadata();
//     return NextResponse.json({ success: true, data: metadata });
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }




"use server";

import { NextResponse } from "next/server";

const repoOwner = "rndsouza2024";
const repoName = "info";
const filePath = "info.json";
const token = process.env.GITHUB_TOKEN;

// Fetch existing metadata from GitHub JSON
async function fetchMetadata(): Promise<Record<string, any>> {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return {}; // Return empty object if file doesn't exist

  const fileData = await response.json();
  const content = Buffer.from(fileData.content, "base64").toString(); // Decode base64
  return JSON.parse(content); // Convert JSON string to object
}

// Update GitHub JSON with new metadata
async function updateMetadata(fileName: string, newData: any) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  // Fetch existing data
  const existingData = await fetchMetadata();

  // Add new structured data (key = filename)
  const updatedData = { ...existingData, [fileName]: newData };
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
      message: "Update video metadata",
      content: updatedContent,
      sha: sha,
    }),
  });

  return response.ok;
}

// Upload a file to GitHub (for storing thumbnails)
async function uploadToGitHub(fileName: string, fileBuffer: Buffer) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/thumbnails/${fileName}.jpg`;

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
      message: `Upload ${fileName}.jpg`,
      content: base64Content,
      sha: sha || undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`❌ Failed to upload ${fileName}.jpg to GitHub`);
  }

  return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/thumbnails/${fileName}.jpg`;
}

// **Upload API**
export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string; // URL where the video is stored
    const thumbnail = formData.get("thumbnail") as File;

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid or missing file" }, { status: 400 });
    }

    console.log(`✅ Received file: ${file.name}`);

    const fileName = file.name; // Use filename as JSON key

    // **Step 1: Upload thumbnail to GitHub (if provided)**
    let thumbnailUrl = "";
    if (thumbnail) {
      const arrayBuffer = await thumbnail.arrayBuffer();
      const thumbnailBuffer = Buffer.from(arrayBuffer);
      thumbnailUrl = await uploadToGitHub(fileName, thumbnailBuffer);
    }

    // **Step 2: Store video metadata in GitHub JSON**
    const newMetadata = {
      title,
      description,
      thumbnailUrl,
      videoUrl,
    };

    const success = await updateMetadata(fileName, newMetadata);
    if (!success) {
      return NextResponse.json({ success: false, message: "Failed to update GitHub" });
    }

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      metadata: newMetadata,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// **Fetch Metadata API**
export async function GET() {
  try {
    const metadata = await fetchMetadata();
    return NextResponse.json({ success: true, data: metadata });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
