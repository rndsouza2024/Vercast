// "use client"

// import { useState } from "react"
// import { UploadForm } from "@/components/upload-form"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
// import { Upload } from "lucide-react"

// export default function Home() {
//   const [uploadedVideos, setUploadedVideos] = useState([])

//   const handleUploadSuccess = (newVideo) => {
//     setUploadedVideos((prev) => [newVideo, ...prev])
//   }

//   return (
//     <main className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Video Uploader</h1>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Upload className="mr-2 h-4 w-4" />
//               Upload Video
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogTitle>Upload Video</DialogTitle>
//             <UploadForm onUploadSuccess={handleUploadSuccess} />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {uploadedVideos.length > 0 ? (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">Recently Uploaded</h2>
//           <div className="grid gap-4">
//             {uploadedVideos.map((video, index) => (
//               <div key={index} className="p-4 border rounded-lg">
//                 <h3 className="font-medium">{video.title}</h3>
//                 <p className="text-sm text-gray-500">{video.description}</p>
//                 <p className="text-sm text-blue-500 mt-2">
//                   <a href={video.embedUrl} target="_blank" rel="noopener noreferrer">
//                     View Video
//                   </a>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-8">
//           No videos uploaded yet. Click the Upload button to get started.
//         </p>
//       )}
//     </main>
//   )
// }


// "use client"

// import { useState } from "react"
// import { UploadForm } from "@/components/upload-form"
// import { VideoGrid } from "@/components/video-grid"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import { Upload } from "lucide-react"

// export default function Home() {
//   const [videos, setVideos] = useState([])

//   const handleUploadSuccess = (newVideo) => {
//     setVideos([newVideo, ...videos])
//   }

//   return (
//     <main className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Abyss Uploader</h1>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Upload className="mr-2 h-4 w-4" />
//               Upload Video
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <UploadForm onUploadSuccess={handleUploadSuccess} />
//           </DialogContent>
//         </Dialog>
//       </div>
//       <VideoGrid videos={videos} />
//     </main>
//   )
// }





















// "use client"

// import { useState } from "react"
// import { UploadForm } from "@/components/upload-form"
// import { VideoGrid } from "@/components/video-grid"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
// import { Upload } from "lucide-react"

// export default function Home() {
//   const [videos, setVideos] = useState([])

//   const handleUploadSuccess = (newVideo) => {
//     setVideos((prevVideos) => [newVideo, ...prevVideos]) // Use functional update
//   }

//   return (
//     <main className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Abyss Uploader</h1>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Upload className="mr-2 h-4 w-4" />
//               Upload Video
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogTitle>Upload Video</DialogTitle> {/* ✅ Fix accessibility */}
//             <UploadForm onUploadSuccess={handleUploadSuccess} />
//           </DialogContent>
//         </Dialog>
//       </div>
//       <VideoGrid videos={videos} />
//     </main>
//   )
// }















// "use client";

// import { useState } from "react";
// import { UploadForm } from "@/components/upload-form";
// import { VideoGrid } from "@/components/video-grid";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
// import { Upload } from "lucide-react";

// export default function Home() {
//   const [videos, setVideos] = useState([]);

//   const handleUploadSuccess = (newVideo) => {
//     setVideos((prevVideos) => [newVideo, ...prevVideos]);
//   };

//   return (
//     <main className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Abyss Uploader</h1>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Upload className="mr-2 h-4 w-4" />
//               Upload Video
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogTitl  e>Upload Video</DialogTitl>
//             <UploadForm onUploadSuccess={handleUploadSuccess} />
//           </DialogContent>
//         </Dialog>
//       </div>
//       <VideoGrid videos={videos} />
//     </main>
//   );
// }









"use client";

import { useState } from "react";
import { UploadForm } from "@/components/upload-form";
import { VideoGrid } from "@/components/video-grid";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  const handleUploadSuccess = (newVideo) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Abyss Uploader</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Upload Video</DialogTitle>
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <VideoGrid videos={videos} />
    </main>
  );
}




