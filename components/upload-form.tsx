
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




















































































// "use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !title || !description) return;

    setUploading(true);
    setError(null);

    try {
      // Step 1: Get authentication cookie
      setStatus("Authenticating...");
      const authResponse = await fetch("/api/auth", { method: "POST" });
      const authData = await authResponse.json();
      if (!authData.cookie) throw new Error("Authentication failed");

      // Step 2: Direct upload to Hydrax
      setStatus("Uploading video...");
      const hydraxForm = new FormData();
      hydraxForm.append("file", file, file.name);

      const uploadResponse = await fetch("http://up.hydrax.net/8162132ce5ca12ec2f06124d577cb23a", {
        method: "POST",
        headers: { Cookie: authData.cookie },
        body: hydraxForm,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      // Step 3: Handle response from Hydrax
      const result = await uploadResponse.json();
      if (!result.slug) throw new Error("Invalid upload response");

      // Step 4: Update metadata on GitHub (send data like title, description, and slug)
      setStatus("Upload successful! Updating metadata...");
      const metadataResponse = await fetch("https://api.github.com/repos/your-github-username/your-repo/contents/path/to/your/file.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token YOUR_GITHUB_TOKEN`,
        },
        body: JSON.stringify({
          message: "Update metadata for new video",
          content: btoa(
            JSON.stringify({
              slug: result.slug,
              title,
              description,
              thumbnailUrl: thumbnailFile ? URL.createObjectURL(thumbnailFile) : "", // Optionally handle thumbnail URL
            })
          ),
          sha: "sha-of-the-existing-file-if-applicable", // Optional: provide the sha of the file you're updating
        }),
      });

      if (!metadataResponse.ok) {
        const errorText = await metadataResponse.text();
        throw new Error(`GitHub update failed: ${errorText}`);
      }

      setShowMessage(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File input section */}
        <div>
          <Label htmlFor="video">Video File</Label>
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            disabled={uploading}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Supported formats: MP4, MOV, AVI, MKV (max 2GB)
          </p>
        </div>

        {/* Title input */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={uploading}
          />
        </div>

        {/* Description input */}
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

        {/* Thumbnail input */}
        <div>
          <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            disabled={uploading}
          />
        </div>

        {/* Status messages */}
        {error && (
          <p className="text-red-500 bg-red-50 p-2 rounded text-sm">
            ❌ {error}
          </p>
        )}
        {status && (
          <p className="text-green-500 bg-green-50 p-2 rounded text-sm">
            {status}
          </p>
        )}

        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Video"
          )}
        </Button>
      </form>

      <Dialog open={showMessage} onOpenChange={setShowMessage}>
        <DialogContent>
          <DialogTitle>Upload Successful</DialogTitle>
          <p>
            Your video has been uploaded and is being processed. It will be
            available shortly.
          </p>
          <Button onClick={() => setShowMessage(false)} className="mt-4 w-full">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
