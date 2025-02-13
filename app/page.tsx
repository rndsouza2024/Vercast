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
//             <DialogTitle>Upload Video</DialogTitle>
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
        <h1 className="text-3xl font-bold">Vercast Player</h1>
        {/* <Dialog>
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
        </Dialog> */}
      </div>
      <VideoGrid videos={videos} />
    </main>
  );
}




