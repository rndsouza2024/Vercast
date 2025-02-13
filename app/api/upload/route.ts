// import { NextResponse } from "next/server"
// import FormData from "form-data"
// import fetch from "node-fetch"

// async function authenticateAbyss() {
//   const response = await fetch("https://abyss.to/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: "dsouzarnd@gmail.com",
//       password: "Navinjoyjeff131977",
//     }),
//   })

//   if (!response.ok) {
//     throw new Error("Authentication failed")
//   }

//   return response.headers.get("set-cookie")
// }

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get("file") as File
//     const title = formData.get("title") as string
//     const description = formData.get("description") as string
//     const thumbnail = formData.get("thumbnail") as File | null

//     const authCookie = await authenticateAbyss()

//     const hydraxForm = new FormData()
//     const buffer = Buffer.from(await file.arrayBuffer())
//     hydraxForm.append("file", buffer, {
//       filename: file.name,
//       contentType: file.type,
//     })

//     const response = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
//       method: "POST",
//       headers: {
//         Cookie: authCookie as string,
//       },
//       body: hydraxForm as any,
//     })

//     const data = await response.json()

//     let thumbnailUrl = `https://short.icu/${data.slug}?thumbnail=1`
//     if (thumbnail) {
//       // Here you would upload the thumbnail and get its URL
//       // For now, we'll use a placeholder
//       thumbnailUrl = "https://example.com/thumbnail-demo.jpg"
//     }

//     return NextResponse.json({
//       success: true,
//       data: {
//         slug: data.slug,
//         embedUrl: `https://short.icu/${data.slug}`,
//         thumbnailUrl,
//         title,
//         description,
//       },
//     })
//   } catch (error) {
//     console.error("Upload error:", error)
//     return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 })
//   }
// }








































// const axios = require("axios");
// const fs = require("fs");
// const FormData = require("form-data");
// const { initializeApp } = require("firebase/app");
// const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// // Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDoP6XIZkUwNf7dPc9lSrW8gA0TkVzkiB8",
//   authDomain: "doogel-d35cc.firebaseapp.com",
//   projectId: "doogel-d35cc",
//   storageBucket: "doogel-d35cc.appspot.com",
//   messagingSenderId: "371545070379",
//   appId: "1:371545070379:web:35b00cfa255ec3aa7c836e",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // User credentials
// const email = "dsouzarnd@gmail.com";
// const password = "Navinjoyjeff131977";

// // File details
// const filePath = "./demo.mp4";
// const fileName = "demo.mp4";
// const fileType = "video/mp4";

// // Authenticate and Upload
// async function authenticateAndUpload() {
//   try {
//     // **Step 1: Firebase Authentication**
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const token = await userCredential.user.getIdToken(); // Get Firebase token

//     console.log("✅ Successfully logged into Firebase");

//     // **Step 2: Authenticate with Abyss**
//     const abyssResponse = await axios.post(
//       "https://abyss.to/login",
//       { email, password },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     if (!abyssResponse.headers["set-cookie"]) {
//       throw new Error("❌ Authentication with Abyss failed");
//     }

//     const authCookie = abyssResponse.headers["set-cookie"][0];
//     console.log("✅ Successfully authenticated with Abyss");

//     // **Step 3: Upload file to Hydrax**
//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(filePath), {
//       filename: fileName,
//       contentType: fileType,
//     });

//     const uploadResponse = await axios.post(
//       "http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//           Cookie: authCookie, // Abyss authentication
//         },
//       }
//     );

//     console.log("✅ File uploaded successfully:", uploadResponse.data);
//   } catch (error) {
//     console.error("❌ Error:", error.message);
//   }
// }

// // Run the function
// authenticateAndUpload();











import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    // **Step 1: Authenticate with Abyss**
    const authCookie = await authenticateAbyss();

    // **Step 2: Extract file from request**
    const formData = await req.formData();
    const file = formData.get("file") as File;

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

    console.log("✅ File uploaded successfully:", data);

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      slug: data.slug,
      embedUrl: `https://short.icu/${data.slug}`,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
