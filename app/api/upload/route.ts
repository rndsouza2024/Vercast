
// "use server";

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     if (req.method !== "POST") {
//       return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!(file instanceof Blob)) {
//       return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
//     }

//     // 🌟 STEP 1: LOGIN TO HYDRAX AND GET TOKEN 🌟
//     const loginResponse = await fetch("http://hydrax.net/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: "dsouzarnd@gmail.com",
//         password: "Navinjoyjeff131977",
//       }),
//     });

//     const loginData = await loginResponse.json();
//     if (!loginResponse.ok) throw new Error(`Login failed: ${loginData.message}`);

//     const token = loginData.token;
//     console.log("✅ Login Successful. Token:", token);

//     // 🌟 STEP 2: UPLOAD FILE TO HYDRAX 🌟
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const hydraxForm = new FormData();
//     hydraxForm.append("file", new Blob([buffer], { type: file.type }), file.name);

//     const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: hydraxForm,
//     });

//     const responseText = await uploadResponse.text();
//     console.log("📢 Hydrax Upload Response:", responseText);

//     if (!uploadResponse.ok) {
//       throw new Error(`❌ Upload failed: ${responseText}`);
//     }

//     return NextResponse.json({ success: true, response: responseText });

//   } catch (error) {
//     console.error("❌ Upload error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


// "use server";
// // pages/api/upload.js
// import { IncomingForm } from 'formidable';
// import { createReadStream } from 'fs';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing
//   },
// };

// export default async function handler(req, res) {
//   // Parse form data
//   const form = new IncomingForm();
//   const [fields, files] = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve([fields, files]);
//     });
//   });

//   try {
//     // Get the uploaded file
//     const file = files.video[0];
//     const fileStream = createReadStream(file.filepath);

//     // Abyss.to API credentials
//     const username = process.env.ABYSS_USERNAME;
//     const password = process.env.ABYSS_PASSWORD;
//     const auth = Buffer.from(`${username}:${password}`).toString('base64');

//     // Upload to Abyss.to
//     const response = await fetch('https://abyss.to/api/v1/upload', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Basic ${auth}`,
//         'Content-Type': 'multipart/form-data',
//       },
//       body: fileStream,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Abyss.to upload failed: ${errorText}`);
//     }

//     const data = await response.json();
//     res.status(200).json({ url: data.url });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: error.message });
//   }
// }


// "use server";
// app/api/upload/route.ts
// import { NextRequest, NextResponse } from "next/server";

// // ✅ Authentication Helper
// async function authenticateAbyss() {
//   const response = await fetch("https://abyss.to/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: process.env.ABYSS_EMAIL,
//       password: process.env.ABYSS_PASSWORD,
//     }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Abyss authentication failed: ${errorText}`);
//   }

//   const authCookie = response.headers.get("set-cookie");
//   if (!authCookie) throw new Error("No authentication cookie received");
  
//   return authCookie;
// }

// // ✅ Main Upload Handler
// export async function POST(req: NextRequest) {
//   try {
//     // Authenticate first
//     const authCookie = await authenticateAbyss();
    
//     // Parse form data
//     const formData = await req.formData();
//     const file = formData.get("video") as File;

//     // Validate file
//     if (!(file instanceof Blob) {
//       return NextResponse.json(
//         { success: false, error: "Invalid file format" },
//         { status: 400 }
//       );
//     }

//     // Prepare upload to Hydrax
//     const hydraxForm = new FormData();
//     hydraxForm.append("file", file, file.name);

//     // Upload to Hydrax with authentication
//     const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
//       method: "POST",
//       headers: { Cookie: authCookie },
//       body: hydraxForm,
//     });

//     // Handle response
//     if (!uploadResponse.ok) {
//       const errorText = await uploadResponse.text();
//       return NextResponse.json(
//         { success: false, error: `Upload failed: ${errorText}` },
//         { status: 500 }
//       );
//     }

//     // Parse successful response
//     const result = await uploadResponse.json();
    
//     return NextResponse.json({
//       success: true,
//       url: `https://short.icu/${result.slug}`
//     });

//   } catch (error: any) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

















































































































// "use server";
// // app/api/upload/route.ts
// import { NextRequest, NextResponse } from "next/server";

// // ✅ Authentication Helper
// async function authenticateAbyss() {
//   const response = await fetch("https://abyss.to/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: process.env.ABYSS_EMAIL,
//       password: process.env.ABYSS_PASSWORD,
//     }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Abyss authentication failed: ${errorText}`);
//   }

//   const authCookie = response.headers.get("set-cookie");
//   if (!authCookie) throw new Error("No authentication cookie received");
  
//   return authCookie;
// }

// // ✅ Main Upload Handler
// export async function POST(req: NextRequest) {
//   try {
//     // Authenticate first
//     const authCookie = await authenticateAbyss();
    
//     // Parse form data
//     const formData = await req.formData();
//     const file = formData.get("video") as File;

//     // Validate file - FIXED SYNTAX HERE
//     if (!(file instanceof Blob)) { // Added missing closing parenthesis
//       return NextResponse.json(
//         { success: false, error: "Invalid file format" },
//         { status: 400 }
//       );
//     }

//     // Prepare upload to Hydrax
//     const hydraxForm = new FormData();
//     hydraxForm.append("file", file, file.name);

//     // Upload to Hydrax with authentication
//     const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
//       method: "POST",
//       headers: { Cookie: authCookie },
//       body: hydraxForm,
//     });

//     // Handle response
//     if (!uploadResponse.ok) {
//       const errorText = await uploadResponse.text();
//       return NextResponse.json(
//         { success: false, error: `Upload failed: ${errorText}` },
//         { status: 500 }
//       );
//     }

//     // Parse successful response
//     const result = await uploadResponse.json();
    
//     return NextResponse.json({
//       success: true,
//       url: `https://short.icu/${result.slug}`
//     });

//   } catch (error: any) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }















































































// "use server";
// import { NextRequest, NextResponse } from "next/server";

// // ✅ Authentication Helper
// async function authenticateAbyss() {
//   const response = await fetch("https://abyss.to/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: process.env.ABYSS_EMAIL,
//       password: process.env.ABYSS_PASSWORD,
//     }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Abyss authentication failed: ${errorText}`);
//   }

//   const authCookie = response.headers.get("set-cookie");
//   if (!authCookie) throw new Error("No authentication cookie received");
  
//   return authCookie;
// }

// // ✅ GitHub API Helper to Save Metadata
// async function saveToGitHub(metadata: any) {
//   const githubResponse = await fetch("https://api.github.com/repos/your_username/your_repo/contents/video_metadata.json", {
//     method: "PUT",
//     headers: {
//       "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: "Add video metadata",
//       content: Buffer.from(JSON.stringify(metadata)).toString("base64"),
//     }),
//   });

//   if (!githubResponse.ok) {
//     const errorText = await githubResponse.text();
//     throw new Error(`GitHub save failed: ${errorText}`);
//   }
// }

// // ✅ Main Upload Handler
// export async function POST(req: NextRequest) {
//   try {
//     // Authenticate first
//     const authCookie = await authenticateAbyss();
    
//     // Parse form data
//     const formData = await req.formData();
//     const file = formData.get("video") as File;
//     const fileName = formData.get("fileName") as string;
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const thumbnailUrl = formData.get("thumbnailUrl") as string;
//     const thumbnailFile = formData.get("thumbnailFile") as File;

//     // Validate file
//     if (!(file instanceof Blob)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid file format" },
//         { status: 400 }
//       );
//     }

//     // Prepare upload to Hydrax
//     const hydraxForm = new FormData();
//     hydraxForm.append("file", file, file.name);

//     // Upload to Hydrax with authentication
//     const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
//       method: "POST",
//       headers: { Cookie: authCookie },
//       body: hydraxForm,
//     });

//     if (!uploadResponse.ok) {
//       const errorText = await uploadResponse.text();
//       return NextResponse.json(
//         { success: false, error: `Upload failed: ${errorText}` },
//         { status: 500 }
//       );
//     }

//     const result = await uploadResponse.json();
//     const videoUrl = `https://short.icu/${result.slug}`;

//     // Prepare metadata for GitHub
//     const metadata = {
//       [fileName]: {
//         title,
//         description,
//         thumbnailUrl: thumbnailFile ? URL.createObjectURL(thumbnailFile) : thumbnailUrl,
//         videoUrl,
//       },
//     };
//     await saveToGitHub(metadata);

//     return NextResponse.json({
//       success: true,
//       url: videoUrl,
//     });

//   } catch (error: any) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

"use server";
import { NextRequest, NextResponse } from "next/server";

// GitHub configuration
const repoOwner = "rndsouza2024"; // Replace with your GitHub username
const repoName = "info"; // Replace with your repository name
const filePath = "info.json"; // JSON file to store video metadata
const token = process.env.GITHUB_TOKEN; // Use environment variable for GitHub token

// ✅ Authentication Helper
async function authenticateAbyss() {
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
    throw new Error(`Abyss authentication failed: ${errorText}`);
  }

  const authCookie = response.headers.get("set-cookie");
  if (!authCookie) throw new Error("No authentication cookie received");

  return authCookie;
}

// ✅ GitHub API Helper to Save Metadata
async function updateMetadata(newMetadata: any) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  // Fetch existing file content to get the SHA
  const existingFileResponse = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  let fileContent = null;
  let sha = null;
  if (existingFileResponse.ok) {
    const fileData = await existingFileResponse.json();
    fileContent = fileData.content ? Buffer.from(fileData.content, "base64").toString("utf8") : "{}";
    sha = fileData.sha; // Get the SHA for updates
  } else {
    fileContent = "{}"; // If no file exists, create new
  }

  const existingMetadata = JSON.parse(fileContent);
  const updatedMetadata = { ...existingMetadata, ...newMetadata };

  const githubResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Update video metadata",
      content: Buffer.from(JSON.stringify(updatedMetadata)).toString("base64"),
      ...(sha && { sha }),  // Include SHA only if file exists
    }),
  });

  if (!githubResponse.ok) {
    const errorText = await githubResponse.text();
    throw new Error(`GitHub update failed: ${errorText}`);
  }
}

// ✅ GitHub API Helper to Upload Thumbnail Image
async function uploadThumbnailToGitHub(thumbnailFile: File, fileName: string) {
  const thumbnailBlob = await thumbnailFile.arrayBuffer();
  const base64Thumbnail = Buffer.from(thumbnailBlob).toString("base64");

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/thumbnails/${fileName}.jpg`;

  const githubResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Upload video thumbnail",
      content: base64Thumbnail,
    }),
  });

  if (!githubResponse.ok) {
    const errorText = await githubResponse.text();
    throw new Error(`GitHub thumbnail upload failed: ${errorText}`);
  }

  const fileData = await githubResponse.json();
  return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/thumbnails/${fileName}.jpg`;
}

// ✅ Main Upload Handler
export async function POST(req: NextRequest) {
  try {
    // Authenticate first
    const authCookie = await authenticateAbyss();

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("video") as File;
    const fileName = formData.get("fileName") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const thumbnailFile = formData.get("thumbnailFile") as File;

    // Validate file
    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: "Invalid file format" },
        { status: 400 }
      );
    }

    // Prepare upload to Hydrax
    const hydraxForm = new FormData();
    hydraxForm.append("file", file, file.name);

    // Upload to Hydrax with authentication
    const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
      method: "POST",
      headers: { Cookie: authCookie },
      body: hydraxForm,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      return NextResponse.json(
        { success: false, error: `Upload failed: ${errorText}` },
        { status: 500 }
      );
    }

    const result = await uploadResponse.json();
    const videoUrl = `https://short.icu/${result.slug}`;

    // Upload the thumbnail to GitHub
    let thumbnailUrl = "";
    if (thumbnailFile) {
      thumbnailUrl = await uploadThumbnailToGitHub(thumbnailFile, fileName);
    }

    // Prepare metadata for GitHub
    const metadata = {
      [fileName]: {
        title,
        description,
        thumbnailUrl, // Use the GitHub-hosted thumbnail URL
        videoUrl,
      },
    };
    await updateMetadata(metadata);

    return NextResponse.json({
      success: true,
      url: videoUrl,
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
