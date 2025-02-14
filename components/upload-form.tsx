  // "use client"

  // import { useState } from "react"
  // import { Button } from "@/components/ui/button"
  // import { Input } from "@/components/ui/input"
  // import { Textarea } from "@/components/ui/textarea"
  // import { Label } from "@/components/ui/label"
  // import { Loader2 } from "lucide-react"

  // export function UploadForm({ onUploadSuccess }) {
  //   const [uploading, setUploading] = useState(false)

  //   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault()
  //     setUploading(true)

  //     try {
  //       const formData = new FormData(event.currentTarget)
  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData,
  //       })

  //       const data = await response.json()

  //       if (!data.success) {
  //         throw new Error("Upload failed")
  //       }

  //       onUploadSuccess(data.data)
  //     } catch (error) {
  //       console.error("Upload failed:", error)
  //     } finally {
  //       setUploading(false)
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
  //     </form>
  //   )
  // }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function UploadForm({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(""); // ✅ New state for message

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setUploadMessage(""); // Reset message on new upload

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Upload failed");
      }

      onUploadSuccess(data.data);

      // ✅ Show message after upload
      setUploadMessage("✅ Video uploaded successfully! Processing now... Check back in a few minutes.");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">Video File (.mp4 or .mkv)</Label>
        <Input id="file" name="file" type="file" accept=".mp4,.mkv" required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
        <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
      </div>
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

      {/* ✅ Eye-catching message below the button */}
      {uploadMessage && (
        <p className="mt-4 text-center text-lg font-semibold text-blue-600">
          {uploadMessage}
        </p>
      )}
    </form>
  );
}





















// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";

// export function UploadForm({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setUploading(true);

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
//       setShowMessage(true); // Show processing message
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <>
//       <form onSubmit={onSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="file">Video File (.mp4 or .mkv)</Label>
//           <Input id="file" name="file" type="file" accept=".mp4,.mkv" required />
//         </div>
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input id="title" name="title" required />
//         </div>
//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea id="description" name="description" />
//         </div>
//         <div>
//           <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
//           <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
//         </div>
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

//       {/* ✅ Modal for processing message */}
//       {showMessage && (
//         <Dialog open={showMessage} onOpenChange={setShowMessage}>
//           <DialogContent>
//             <DialogTitle>📢 Video Processing</DialogTitle>
//             <p>Your video is being processed. Please check back later.</p>
//             <DialogClose asChild>
//               <Button className="mt-4 w-full">OK</Button>
//             </DialogClose>
//           </DialogContent>
//         </Dialog>
//       )}
//     </>
//   );
// }


































// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

// export function UploadForm({ onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//   const [thumbnailUrl, setThumbnailUrl] = useState("");

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setUploading(true);

//     try {
//       const formData = new FormData(event.currentTarget);
//       formData.append("thumbnailUrl", thumbnailUrl); // ✅ Append URL

//       // 🔹 Step 1: Upload the video file & metadata
//       const uploadResponse = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();
//       if (!uploadData.success) throw new Error("Video upload failed");

//       // 🔹 Step 2: Send metadata (title, description, thumbnail) to GitHub
//       const metadata = {
//         title: formData.get("title"),
//         description: formData.get("description"),
//         videoUrl: uploadData.data.videoUrl, // Get uploaded video URL
//         thumbnailUrl,
//       };

//       const githubResponse = await fetch("/api/github", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(metadata),
//       });

//       const githubData = await githubResponse.json();
//       if (!githubData.success) throw new Error("GitHub upload failed");

//       // 🔹 Step 3: Notify parent component & show processing message
//       onUploadSuccess(uploadData.data);
//       setShowMessage(true);

//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <>
//       <form onSubmit={onSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="file">Video File (.mp4 or .mkv)</Label>
//           <Input id="file" name="file" type="file" accept=".mp4,.mkv" required />
//         </div>
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input id="title" name="title" required />
//         </div>
//         <div>
//           <Label htmlFor="description">Description</Label>
//           <Textarea id="description" name="description" />
//         </div>
//         <div>
//           <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
//           <Input
//             id="thumbnailUrl"
//             name="thumbnailUrl"
//             type="url"
//             placeholder="https://example.com/thumbnail.jpg"
//             value={thumbnailUrl}
//             onChange={(e) => setThumbnailUrl(e.target.value)}
//             required
//           />
//         </div>
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

//       {/* ✅ Modal for processing message */}
//       <Dialog open={showMessage} onOpenChange={setShowMessage}>
//         <DialogContent>
//           <DialogTitle>📢 Video Processing</DialogTitle>
//           <p>Your video is being processed. Please check back later.</p>
//           <DialogClose asChild>
//             <Button className="mt-4 w-full" onClick={() => setShowMessage(false)}>OK</Button>
//           </DialogClose>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }






