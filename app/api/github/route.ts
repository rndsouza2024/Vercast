// import { NextResponse } from "next/server"

// const repoOwner = "rndsouza2024"
// const repoName = "info"
// const filePath = "info.json"

// // ✅ Use environment variable
// const token = process.env.GITHUB_TOKEN

// if (!token) {
//   throw new Error("GITHUB_TOKEN environment variable is not set")
// }

// async function fetchThumbnails() {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   })

//   if (!response.ok) {
//     if (response.status === 404) {
//       return {} // Return empty if file doesn't exist
//     }
//     throw new Error(`GitHub API error: ${response.statusText}`)
//   }

//   const fileData = await response.json()
//   const content = atob(fileData.content)
//   return JSON.parse(content)
// }

// async function updateThumbnails(newThumbnailData: any) {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`

//   try {
//     // Fetch existing data
//     const existingData = await fetchThumbnails()
//     const updatedData = { ...existingData, ...newThumbnailData }
//     const updatedContent = btoa(JSON.stringify(updatedData, null, 2))

//     // Get file SHA if it exists
//     let sha
//     try {
//       const fileResponse = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (fileResponse.ok) {
//         const fileData = await fileResponse.json()
//         sha = fileData.sha
//       }
//     } catch (error) {
//       console.warn("File doesn't exist yet, creating new one")
//     }

//     // Update or create file
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: "Update thumbnails",
//         content: updatedContent,
//         ...(sha && { sha }), // Only include sha if file exists
//       }),
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to update GitHub: ${response.statusText}`)
//     }

//     return true
//   } catch (error) {
//     console.error("GitHub update error:", error)
//     return false
//   }
// }

// // GET endpoint to fetch all thumbnails
// export async function GET() {
//   try {
//     const thumbnails = await fetchThumbnails()
//     return NextResponse.json(thumbnails)
//   } catch (error) {
//     console.error("Failed to fetch thumbnails:", error)
//     return NextResponse.json({ error: "Failed to fetch thumbnails" }, { status: 500 })
//   }
// }

// // POST endpoint to update thumbnails
// export async function POST(req: Request) {
//   try {
//     const data = await req.json()
//     const success = await updateThumbnails(data)

//     if (!success) {
//       return NextResponse.json({ success: false, message: "Failed to update GitHub" }, { status: 500 })
//     }

//     return NextResponse.json({ success: true, data })
//   } catch (error) {
//     console.error("Failed to update thumbnails:", error)
//     return NextResponse.json({ success: false, message: "Failed to process request" }, { status: 500 })
//   }
// }

// "use server";

// import { NextResponse } from "next/server";

// const repoOwner = "rndsouza2024";
// const repoName = "info";
// const filePath = "info.json";
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

// async function updateThumbnails(newThumbnailData) {
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
// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get("file");
//   const title = formData.get("title");
//   const description = formData.get("description");
//   const thumbnail = formData.get("thumbnail");

//   if (!file) {
//     return NextResponse.json({ success: false, message: "No file uploaded" });
//   }

//   // Process file upload (Assuming you have a way to store videos)
//   const videoUrl = `http://localhost:3000/${file.name}`;

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










// "use server";

// import { NextResponse } from "next/server";

// const repoOwner = "rndsouza2024";
// const repoName = "info";
// const filePath = "info.json";
// const token = process.env.GITHUB_TOKEN;

// // Fetch existing metadata from GitHub JSON
// async function fetchMetadata() {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

//   const response = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!response.ok) return {}; // Return empty if file doesn't exist

//   const fileData = await response.json();
//   const content = Buffer.from(fileData.content, "base64").toString(); // Decode base64
//   return JSON.parse(content); // Convert JSON string to object
// }

// // Update GitHub JSON with new metadata
// async function updateMetadata(newData: any) {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

//   // Fetch existing data
//   const existingData = await fetchMetadata();

//   // Merge new data
//   const updatedData = { ...existingData, ...newData };
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
//       message: "Update metadata",
//       content: updatedContent,
//       sha: sha,
//     }),
//   });

//   return response.ok;
// }

// // Upload a file to GitHub (for storing thumbnails)
// async function uploadToGitHub(fileName: string, fileBuffer: Buffer, mimeType: string) {
//   const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/thumbnails/${fileName}`;

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
//       message: `Upload ${fileName}`,
//       content: base64Content,
//       sha: sha || undefined,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`❌ Failed to upload ${fileName} to GitHub`);
//   }

//   return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/thumbnails/${fileName}`;
// }

// // **Upload API**
// export async function POST(req: Request) {
//   try {
//     if (req.method !== "POST") {
//       return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const thumbnail = formData.get("thumbnail") as File;

//     if (!(file instanceof Blob)) {
//       return NextResponse.json({ error: "Invalid or missing file" }, { status: 400 });
//     }

//     console.log(`✅ Received file: ${file.name}`);

//     // **Step 1: Store video URL (assuming already uploaded somewhere)**
//     const videoUrl = `http://localhost:3000/${file.name}`;

//     // **Step 2: Upload thumbnail to GitHub (if provided)**
//     let thumbnailUrl = "";
//     if (thumbnail) {
//       const arrayBuffer = await thumbnail.arrayBuffer();
//       const thumbnailBuffer = Buffer.from(arrayBuffer);
//       const fileName = `${file.name}.jpg`; // Store as JPEG in GitHub
//       thumbnailUrl = await uploadToGitHub(fileName, thumbnailBuffer, thumbnail.type);
//     }

//     // **Step 3: Store video metadata in GitHub JSON**
//     const newMetadata = {
//       [file.name]: {
//         title,
//         description,
//         thumbnailUrl,
//         videoUrl,
//       },
//     };

//     const success = await updateMetadata(newMetadata);
//     if (!success) {
//       return NextResponse.json({ success: false, message: "Failed to update GitHub" });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Upload successful",
//       videoUrl,
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

import { NextRequest, NextResponse } from "next/server";

// Define the folder where you want to store thumbnails
const repoOwner = "rndsouza2024";
const repoName = "info";
const filePath = "info.json";
const thumbnailsFolder = "thumbnails"; // Folder where thumbnails will be stored

export async function POST(req: NextRequest) {
  try {
    const { title, description, videoUrl, thumbnail, fileName } = await req.json();
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    // Step 1: Upload the thumbnail image to GitHub
    const thumbnailFileName = `${fileName}.jpg`; // Generate a unique name for the thumbnail
    const thumbnailFilePath = `${thumbnailsFolder}/${thumbnailFileName}`;

    // Upload the thumbnail image to GitHub
    const uploadThumbnailResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${thumbnailFilePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload thumbnail for video: ${title}`,
        content: thumbnail.split(',')[1], // Get Base64 data (remove the prefix part)
      }),
    });

    if (!uploadThumbnailResponse.ok) {
      const errorText = await uploadThumbnailResponse.text();
      return NextResponse.json({ error: `Failed to upload thumbnail: ${errorText}` }, { status: 500 });
    }

    // Step 2: Generate the URL for the uploaded thumbnail
    const thumbnailUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${thumbnailsFolder}/${thumbnailFileName}`;

    // Step 3: Get existing metadata file from GitHub
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const existingResponse = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let existingData = {};
    let sha = null;
    if (existingResponse.ok) {
      const fileData = await existingResponse.json();
      existingData = JSON.parse(Buffer.from(fileData.content, "base64").toString());
      sha = fileData.sha;
    }

    // Step 4: Update metadata with the thumbnail URL
    const updatedData = {
      ...existingData,
      [fileName]: { title, description, videoUrl, thumbnailUrl }, // Add the thumbnail URL
    };

    // Step 5: Commit the metadata changes to GitHub
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add video: ${title}`,
        content: Buffer.from(JSON.stringify(updatedData)).toString("base64"),
        sha,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// "use server";

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     if (req.method !== "POST") {
//       return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
//     }

//     const formData = await req.formData();
//     const fileName = formData.get("fileName") as string;
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const thumbnailUrl = formData.get("thumbnailUrl") as string;

//     if (!fileName || !title || !description || !thumbnailUrl) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // ✅ Structure JSON metadata correctly for GitHub
//     const videoMetadata = {
//       [fileName]: {
//         title,
//         description,
//         thumbnailUrl,
//         videoUrl: null, // Video URL will be updated after upload
//       },
//     };

//     return NextResponse.json({ success: true, metadata: videoMetadata });
//   } catch (error: any) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
