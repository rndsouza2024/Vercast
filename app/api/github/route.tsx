// import { NextResponse } from "next/server";

// const repoOwner = "rndsouza2024";
// const repoName = "upload";
// const filePath = "upload.json";
// const token = process.env.GITHUB_TOKEN;

// async function fetchThumbnails() {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

//   const response = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!response.ok) return {}; // Return empty if file doesn't exist

//   const fileData = await response.json();
//   const content = atob(fileData.content); // Decode base64 content
//   return JSON.parse(content); // Convert JSON string to object
// }

// async function updateThumbnails(newThumbnailData: any) {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

//   // Fetch existing data
//   const existingData = await fetchThumbnails();

//   // Merge new data
//   const updatedData = { ...existingData, ...newThumbnailData };
//   const updatedContent = btoa(JSON.stringify(updatedData, null, 2)); // Convert to base64

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
//       message: "Update thumbnails",
//       content: updatedContent,
//       sha: sha,
//     }),
//   });

//   return response.ok;
// }

// // Handle Upload API
// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;
//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const thumbnail = formData.get("thumbnail") as File | null;

//   if (!file) {
//     return NextResponse.json({ success: false, message: "No file uploaded" });
//   }

//   // Process file upload (Assuming you have a way to store videos)
//   const videoUrl = `https://your-storage.com/${file.name}`;

//   let thumbnailUrl = "";
//   if (thumbnail) {
//     // Convert thumbnail to base64
//     const arrayBuffer = await thumbnail.arrayBuffer();
//     const base64Image = Buffer.from(arrayBuffer).toString("base64");
//     thumbnailUrl = `data:${thumbnail.type};base64,${base64Image}`;
//   }

//   // Store thumbnail reference in GitHub JSON
//   const newThumbnailData = {
//     [file.name]: {
//       title,
//       description,
//       thumbnailUrl,
//       videoUrl,
//     },
//   };

//   const success = await updateThumbnails(newThumbnailData);

//   if (!success) {
//     return NextResponse.json({ success: false, message: "Failed to update GitHub" });
//   }

//   return NextResponse.json({ success: true, data: newThumbnailData });
// }









// import { NextResponse } from "next/server";

// const repoOwner = "rndsouza2024";
// const repoName = "upload";
// const filePath = "upload.json";
// const token = process.env.GITHUB_TOKEN;

// const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

// async function fetchThumbnails() {
//   const response = await fetch(githubApiUrl, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!response.ok) {
//     console.error(`Failed to fetch JSON file: ${response.status}`);
//     return { success: false, message: "Failed to fetch thumbnails.", data: [], sha: null };
//   }

//   const fileData = await response.json();
//   let existingContent;

//   try {
//     existingContent = JSON.parse(Buffer.from(fileData.content, "base64").toString("utf-8"));
//   } catch (error) {
//     console.error("Error parsing existing content:", error);
//     existingContent = [];
//   }

//   return { success: true, data: Array.isArray(existingContent) ? existingContent : [], sha: fileData.sha };
// }

// async function updateThumbnails(newListing: any) {
//   const { data: existingContent, sha } = await fetchThumbnails();

//   // Ensure the data is always an array and append new listing
//   const updatedData = [...existingContent, newListing];

//   // Convert updated JSON to Base64
//   const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64");

//   // Update the JSON file on GitHub
//   const response = await fetch(githubApiUrl, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: "Adding new listing",
//       content: updatedContent,
//       sha: sha || "", // If new file, SHA can be empty
//     }),
//   });

//   if (!response.ok) {
//     console.error("GitHub API error:", await response.json());
//     return { success: false, message: "Failed to update GitHub." };
//   }

//   return { success: true, message: "Thumbnail data updated successfully." };
// }

// // ✅ GET handler (Fetch all thumbnails)
// export async function GET() {
//   try {
//     const { success, data } = await fetchThumbnails();
//     return NextResponse.json({ success, data });
//   } catch (error) {
//     console.error("Error fetching thumbnails:", error);
//     return NextResponse.json({ success: false, message: "Failed to fetch thumbnails." });
//   }
// }

// // ✅ POST handler (Add a new thumbnail entry)
// export async function POST(req: Request) {
//   try {
//     const { title, description, videoUrl, thumbnailUrl } = await req.json();

//     if (!videoUrl || !thumbnailUrl) {
//       return NextResponse.json({ success: false, message: "Video URL and Thumbnail URL are required." });
//     }

//     const newListing = { title, description, videoUrl, thumbnailUrl };
//     const updateResponse = await updateThumbnails(newListing);

//     return NextResponse.json(updateResponse);
//   } catch (error) {
//     console.error("Error in API:", error);
//     return NextResponse.json({ success: false, message: "Internal Server Error." });
//   }
// }


"use server";

import { revalidatePath } from "next/cache";

const repoOwner = "rndsouza2024";
const repoName = "info";
const filePath = "info.json";
const token = process.env.GITHUB_TOKEN;

const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

if (!token) {
  console.error("❌ GitHub token is missing.");
}

async function fetchThumbnails() {
  const response = await fetch(githubApiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) {
    console.warn("🔴 JSON file not found. Creating a new one...");
    return { success: true, data: [], sha: null };
  }

  if (!response.ok) {
    console.error(`❌ Failed to fetch JSON file: ${response.statusText}`);
    return { success: false, message: "Failed to fetch thumbnails.", data: [], sha: null };
  }

  const fileData = await response.json();
  let existingContent;

  try {
    existingContent = JSON.parse(Buffer.from(fileData.content, "base64").toString("utf-8"));
  } catch (error) {
    console.error("❌ Error parsing existing content:", error);
    existingContent = [];
  }

  return { success: true, data: Array.isArray(existingContent) ? existingContent : [], sha: fileData.sha };
}

async function updateThumbnails(newListing: any) {
  const { data: existingContent, sha } = await fetchThumbnails();

  const updatedData = [...existingContent, newListing];
  const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64");

  const requestBody: any = {
    message: "Adding new listing",
    content: updatedContent,
  };

  if (sha) {
    requestBody.sha = sha;
  }

  const response = await fetch(githubApiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ GitHub API Error:", errorData);
    return { success: false, message: "Failed to update GitHub." };
  }

  revalidatePath("/");
  return { success: true, message: "Thumbnail data updated successfully." };
}

// ✅ GET handler
export async function GET() {
  try {
    const { success, data } = await fetchThumbnails();
    return Response.json({ success, data });
  } catch (error) {
    console.error("❌ Error fetching thumbnails:", error);
    return Response.json({ success: false, message: "Failed to fetch thumbnails." });
  }
}

// ✅ POST handler
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;

    if (!videoUrl || !thumbnailUrl) {
      return Response.json({ success: false, message: "Video URL and Thumbnail URL are required." });
    }

    const newListing = { title, description, videoUrl, thumbnailUrl };
    const updateResponse = await updateThumbnails(newListing);

    return Response.json(updateResponse);
  } catch (error) {
    console.error("❌ Error in API:", error);
    return Response.json({ success: false, message: "Internal Server Error." });
  }
}




















