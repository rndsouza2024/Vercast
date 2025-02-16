
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Loader2 } from "lucide-react"

// export function UploadForm() {
//   const [file, setFile] = useState<File | null>(null)
//   const [status, setStatus] = useState("")
//   const [uploading, setUploading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) return;

//     setUploading(true);
//     setStatus("Uploading...");

//     try {
//       const formData = new FormData();
//       formData.append("video", file); // Changed from "file" to "video"

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         setStatus(`Upload successful! URL: ${result.url}`);
//       } else {
//         throw new Error(result.error || 'Upload failed');
//       }
//     } catch (error) {
//       // ... error handling ...
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="video">Video File</Label>
//         <Input 
//           id="video" 
//           name="video" 
//           type="file" 
//           accept="video/*" 
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           required 
//           disabled={uploading} 
//         />
//       </div>
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input id="title" name="title" required disabled={uploading} />
//         </div>
//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea id="description" name="description" disabled={uploading} />
//         </div>
//         <div>
//           <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
//           <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
//         </div>

//         {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">❌ {error}</p>}

//         {uploading && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         )}

//       {status && (
//         <p className={`text-sm p-2 rounded ${
//           status.includes("Error") ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"
//         }`}>
//           {status}
//         </p>
//       )}

//       <Button type="submit" disabled={uploading} className="w-full">
//         {uploading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Uploading...
//           </>
//         ) : (
//           "Upload Video"
//         )}
//       </Button>
//     </form>
//   )
// }




// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// export function UploadForm() {
//   const [file, setFile] = useState<File | null>(null);
//   const [status, setStatus] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [showMessage, setShowMessage] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) return;

//     setUploading(true);
//     setStatus("Uploading...");
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("video", file);

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.success) {
//         setStatus(`Upload successful! URL: ${result.url}`);
//         setShowMessage(true);
//       } else {
//         throw new Error(result.error || "Upload failed");
//       }
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="video">Video File</Label>
//           <Input
//             id="video"
//             name="video"
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             required
//             disabled={uploading}
//           />
//         </div>
 
//         {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">❌ {error}</p>}

//         {uploading && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         )}

//         {status && (
//           <p
//             className={`text-sm p-2 rounded ${
//               status.includes("Error") ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"
//             }`}
//           >
//             {status}
//           </p>
//         )}

//         <Button type="submit" disabled={uploading} className="w-full">
//           {uploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Uploading... 
//             </>
//           ) : (
//             "Upload Video"
//           )}
//         </Button>
//       </form>

//       <Dialog open={showMessage} onOpenChange={setShowMessage}>
//         <DialogContent>
//           <DialogTitle>Upload Successful</DialogTitle>
//           <p>Your video has been uploaded and is being processed. It will be available shortly.</p>
//           <Button onClick={() => setShowMessage(false)} className="mt-4 w-full">
//             OK
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

















































// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// export function UploadForm() {
//   const [file, setFile] = useState<File | null>(null);
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null); // For file upload thumbnail
//   const [thumbnailUrl, setThumbnailUrl] = useState(""); // For thumbnail URL input
//   const [status, setStatus] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [showMessage, setShowMessage] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file || !title || !description || (!thumbnailFile && !thumbnailUrl)) return;

//     setUploading(true);
//     setStatus("Uploading...");
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("video", file);
//       formData.append("fileName", file.name);
//       formData.append("title", title);
//       formData.append("description", description);
//       if (thumbnailFile) {
//         formData.append("thumbnailFile", thumbnailFile);
//       } else {
//         formData.append("thumbnailUrl", thumbnailUrl);
//       }

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.success) {
//         setStatus(`Upload successful! URL: ${result.url}`);
//         setShowMessage(true);
//       } else {
//         throw new Error(result.error || "Upload failed");
//       }
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="video">Video File</Label>
//           <Input
//             id="video"
//             name="video"
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             required
//             disabled={uploading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             disabled={uploading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             disabled={uploading}
//           />
//         </div>

//         <div>
//           <Label htmlFor="thumbnail">Thumbnail (Image File or URL)</Label>
//           <div>
//             {/* Option 1: File Upload for Thumbnail */}
//             <Input
//               id="thumbnailFile"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
//               disabled={uploading}
//             />
//           </div>
//           <div className="mt-2">
//             {/* Option 2: URL Input for Thumbnail */}
//             <Input
//               id="thumbnailUrl"
//               type="text"
//               placeholder="Enter thumbnail URL (optional)"
//               value={thumbnailUrl}
//               onChange={(e) => setThumbnailUrl(e.target.value)}
//               disabled={uploading}
//             />
//           </div>
//         </div>

//         {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">❌ {error}</p>}

//         {uploading && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         )}

//         {status && (
//           <p
//             className={`text-sm p-2 rounded ${
//               status.includes("Error") ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"
//             }`}
//           >
//             {status}
//           </p>
//         )}

//         <Button type="submit" disabled={uploading} className="w-full">
//           {uploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Uploading...
//             </>
//           ) : (
//             "Upload Video"
//           )}
//         </Button>
//       </form>

//       <Dialog open={showMessage} onOpenChange={setShowMessage}>
//         <DialogContent>
//           <DialogTitle>Upload Successful</DialogTitle>
//           <p>Your video has been uploaded and is being processed. It will be available shortly.</p>
//           <Button onClick={() => setShowMessage(false)} className="mt-4 w-full">
//             OK
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }





















































































"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// GitHub configuration
const repoOwner = "rndsouza2024"; // Replace with your GitHub username
const repoName = "info"; // Replace with your repository name
const filePath = "info.json"; // JSON file to store video metadata
const token = process.env.GITHUB_TOKEN; // Use environment variable for GitHub token

// Helper function to authenticate with Abyss
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

// GitHub API to store metadata
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

// Main upload handler
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
    const thumbnailUrl = formData.get("thumbnailUrl") as string;
    const thumbnailFile = formData.get("thumbnailFile") as File;

    // Validate file
    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: "Invalid file format" },
        { status: 400 }
      );
    }

    // Upload file to Abyss
    const hydraxForm = new FormData();
    hydraxForm.append("file", file, file.name);

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

    // Prepare metadata for GitHub
    const metadata = {
      [fileName]: {
        title,
        description,
        thumbnailUrl: thumbnailFile ? URL.createObjectURL(thumbnailFile) : thumbnailUrl,
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

// Main UploadForm Component
export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null); // For file upload thumbnail
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // For thumbnail URL input
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !title || !description || (!thumbnailFile && !thumbnailUrl)) return;

    setUploading(true);
    // setStatus("Uploading...");
    setError(null);
    setProgress(50)
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("fileName", file.name);
      formData.append("title", title);
      formData.append("description", description);
      if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile);
      } else {
        formData.append("thumbnailUrl", thumbnailUrl);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus(`Upload successful! URL: ${result.url}`);
        setShowMessage(true);
      } else {
        throw new Error(result.error || "Upload is progress check after some Time");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <Label htmlFor="video">Video File</Label>
          <Input
            id="video"  
            name="video"
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            disabled={uploading}
          />
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={uploading}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={uploading}
          />
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail (Image File )</Label>
          <div>
            {/* Option 1: File Upload for Thumbnail */}
            <Input
              id="thumbnailFile"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              disabled={uploading}
            />
          </div>
       
        </div>

          {/* {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">❌ {error}</p>} */}

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {status && (
          <p
            className={`text-sm p-2 rounded ${
              status.includes("Error") ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"
            }`}
          >
            {status}
          </p>
        )}

        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading... {progress}% Wait...
            
            </>
          ) : (
            "Upload Video"
          )}
        </Button>
        <p>"By uploading, you agree that your video may be reviewed and deleted if deemed inappropriate."</p>
      </form>

      <Dialog open={showMessage} onOpenChange={setShowMessage}>
        <DialogContent>
          <DialogTitle>Upload Successful</DialogTitle>
          <p>Your video has been uploaded and is being processed. It will be available shortly.</p>
          <Button onClick={() => setShowMessage(false)} className="mt-4 w-full">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
