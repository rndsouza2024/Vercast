// import { NextRequest, NextResponse } from "next/server";

// const repoOwner = "rndsouza2024";
// const repoName = "info";
// const filePath = "info.json";

// export async function POST(req: NextRequest) {
//   try {
//     const { title, description, videoUrl, thumbnail, fileName } = await req.json();
//     const token = process.env.GITHUB_TOKEN;

//     if (!token) {
//       return NextResponse.json(
//         { error: "GitHub token not configured" },
//         { status: 500 }
//       );
//     }

//     // Get existing file
//     const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
//     const existingResponse = await fetch(url, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     let existingData = {};
//     let sha = null;
//     if (existingResponse.ok) {
//       const fileData = await existingResponse.json();
//       existingData = JSON.parse(Buffer.from(fileData.content, "base64").toString());
//       sha = fileData.sha;
//     }

//     // Update metadata
//     const updatedData = {
//       ...existingData,
//       [fileName]: { title, description, videoUrl, thumbnail }
//     };

//     // Commit changes
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         message: `Add video: ${title}`,
//         content: Buffer.from(JSON.stringify(updatedData)).toString("base64"),
//         sha
//       })
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json({ error: errorText }, { status: 500 });
//     }

//     return NextResponse.json({ success: true });

//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

const repoOwner = "rndsouza2024";
const repoName = "info";
const filePath = "info.json";
const thumbnailsFolder = "thumbnails"; // Folder for thumbnails

export async function POST(req: NextRequest) {
  try {
    const { title, description, videoUrl, thumbnail, fileName, thumbnailsFolder } = await req.json();
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    // Get existing file
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const existingResponse = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    let existingData = {};
    let sha = null;
    if (existingResponse.ok) {
      const fileData = await existingResponse.json();
      existingData = JSON.parse(Buffer.from(fileData.content, "base64").toString());
      sha = fileData.sha;
    }

    // Save thumbnail to GitHub in the defined folder
    const thumbnailFileName = `${fileName}.jpg`; // Generate unique name for thumbnail
    const thumbnailFilePath = `${thumbnailsFolder}/${thumbnailFileName}`;

    // Upload the thumbnail to GitHub
    const uploadThumbnailResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${thumbnailFilePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload thumbnail for video: ${title}`,
        content: thumbnail.split(',')[1], // Base64 data (without the prefix part)
      }),
    });

    if (!uploadThumbnailResponse.ok) {
      const errorText = await uploadThumbnailResponse.text();
      return NextResponse.json({ error: `Failed to upload thumbnail: ${errorText}` }, { status: 500 });
    }

    const thumbnailUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${thumbnailsFolder}/${thumbnailFileName}`;

    // Update metadata with thumbnail URL
    const updatedData = {
      ...existingData,
      [fileName]: { title, description, videoUrl, thumbnailUrl },
    };

    // Commit the changes to GitHub
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
      })
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
