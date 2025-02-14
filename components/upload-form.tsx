// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Loader2 } from "lucide-react"
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// export function UploadForm({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false)
//   const [showMessage, setShowMessage] = useState(false)
//   const [error, setError] = useState("")
//   const [progress, setProgress] = useState(0)

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setUploading(true)
//     setError("")
//     setProgress(0)

//     try {
//       const formData = new FormData(event.currentTarget)
//       const file = formData.get("file") as File

//       if (!file) {
//         throw new Error("Please select a file to upload")
//       }

//       // Show initial progress
//       setProgress(10)

//       // Upload to API
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       })

//       // Update progress
//       setProgress(50)

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || `Upload failed: ${response.statusText}`)
//       }

//       const data = await response.json()
//       setProgress(90)

//       if (!data.success) {
//         throw new Error(data.error || "Upload failed")
//       }

//       // Complete progress
//       setProgress(100)

//       // Show success message
//       setShowMessage(true)
//       onUploadSuccess(data.data)

//       // Reset form
//       event.currentTarget.reset()
//     } catch (err) {
//       console.error("Upload failed:", err)
//       setError(err instanceof Error ? err.message : "Upload failed")
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <>
//       <form onSubmit={onSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="file">Video File (MP4 or MKV)</Label>
//           <Input id="file" name="file" type="file" accept="video/mp4,video/x-matroska" required disabled={uploading} />
//         </div>
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input id="title" name="title" required disabled={uploading} />
//         </div>
//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea id="description" name="description" disabled={uploading} />
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

//         <Button type="submit" disabled={uploading} className="w-full">
//           {uploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Uploading... {progress}%
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
//   )
// }



// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";

// export function UploadForm({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState(""); // ✅ New state for message

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setUploading(true);
//     setUploadMessage(""); // Reset message on new upload

//     try {
//       const formData = new FormData(event.currentTarget);
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!data.success) {
//         throw new Error("Upload failed");
//       }

//       onUploadSuccess(data.data);

//       // ✅ Show message after upload
//       setUploadMessage("✅ Video uploaded successfully! Processing now... Check back in a few minutes.");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadMessage("❌ Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="file">Video File (.mp4 or .mkv)</Label>
//         <Input id="file" name="file" type="file" accept=".mp4,.mkv" required />
//       </div>
//       <div>
//         <Label htmlFor="title">Title</Label>
//         <Input id="title" name="title" required />
//       </div>
//       <div>
//         <Label htmlFor="description">Description</Label>
//         <Textarea id="description" name="description" />
//       </div>
//       <div>
//         <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
//         <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
//       </div>
//       <Button type="submit" disabled={uploading} className="w-full">
//         {uploading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Uploading... {progress}%
//           </>
//         ) : (
//           "Upload Video"
//         )}
//       </Button>

//       {/* ✅ Eye-catching message below the button */}
//       {uploadMessage && (
//         <p className="mt-4 text-center text-lg font-semibold text-blue-600">
//           {uploadMessage}
//         </p>
//       )}
//     </form>
//   );
// }





















// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";

// export function UploadForm({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState(""); 
//   const [uploadedVideoUrl, setUploadedVideoUrl] = useState(""); // ✅ Video preview state

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setUploading(true);
//     setUploadMessage(""); 

//     try {
//       const formData = new FormData(event.currentTarget);
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!data.success) {
//         throw new Error("Upload failed");
//       }

//       // ✅ Show message after upload
//       setUploadMessage("✅ Video uploaded successfully! Processing now... Check back in a few minutes.");

//       // ✅ Handle video preview
//       if (data.videoUrl) {
//         setUploadedVideoUrl(data.videoUrl);
//       }

//       // ✅ Pass metadata to parent
//       onUploadSuccess(data.metadata);
//     } catch (error) {
//       console.error("❌ Upload failed:", error);
//       setUploadMessage("❌ Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="file">Video File (.mp4 or .mkv)</Label>
//         <Input id="file" name="file" type="file" accept=".mp4,.mkv" required />
//       </div>
//       <div>
//         <Label htmlFor="title">Title</Label>
//         <Input id="title" name="title" required />
//       </div>
//       <div>
//         <Label htmlFor="description">Description</Label>
//         <Textarea id="description" name="description" />
//       </div>
//       <div>
//         <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
//         <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
//       </div>
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

//       {/* ✅ Upload message */}
//       {uploadMessage && (
//         <p className="mt-4 text-center text-lg font-semibold text-blue-600">
//           {uploadMessage}
//         </p>
//       )}

//       </form>
//   );
// }








// "use client"

// import { useState, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Loader2 } from "lucide-react"
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// export function UploadForm({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false)
//   const [showMessage, setShowMessage] = useState(false)
//   const [error, setError] = useState("")
//   const [progress, setProgress] = useState(0)
//   const formRef = useRef<HTMLFormElement>(null) // ✅ Store form reference

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setUploading(true)
//     setError("")
//     setProgress(0)

//     try {
//       const form = formRef.current
//       if (!form) return // ✅ Prevent null errors

//       const formData = new FormData(form)
//       const file = formData.get("file") as File

//       if (!file) {
//         throw new Error("Please select a file to upload")
//       }

//       setProgress(10)

//       // Upload to API
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       })

//       setProgress(50)

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || `Upload failed: ${response.statusText}`)
//       }

//       const data = await response.json()
//       setProgress(90)

//       if (!data.success) {
//         throw new Error(data.error || "Upload failed")
//       }

//       setProgress(100)

//       setShowMessage(true)
//       onUploadSuccess(data.data)

//       // ✅ Reset form using useRef
//       form.reset()
//     } catch (err) {
//       console.error("Upload failed:", err)
//       setError(err instanceof Error ? err.message : "Upload failed")
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <>
//       <form onSubmit={onSubmit} ref={formRef} className="space-y-4">
//         <div>
//           <Label htmlFor="file">Video File (MP4 or MKV)</Label>
//           <Input id="file" name="file" type="file" accept="video/mp4,video/x-matroska" required disabled={uploading} />
//         </div>
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

//         <Button type="submit" disabled={uploading} className="w-full">
//           {uploading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Uploading... {progress}%
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
//   )
// }















"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function UploadForm({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setError("");
    setProgress(0);

    try {
      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      if (!selectedFile) {
        throw new Error("Please select a file to upload");
      }

      formData.append("file", selectedFile);
      setProgress(10);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(50);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setProgress(90);

      if (!data.success) {
        throw new Error(data.error || "Upload failed");
      }

      setProgress(100);
      setShowMessage(true);
      onUploadSuccess(data.data);
      form.reset();
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleUpload} ref={formRef} className="space-y-4">
        <div>
          <Label htmlFor="file">Video File (MP4 or MKV)</Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="video/mp4,video/x-matroska"
            required
            disabled={uploading}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required disabled={uploading} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" disabled={uploading} />
        </div>
        <div>
          <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
          <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
        </div>

        {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">❌ {error}</p>}

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading... {progress}%
            </>
          ) : (
            "Upload Video"
          )}
        </Button>
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
