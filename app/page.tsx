
//ADDED REPONSIVE 
"use client";

import { useState, useEffect } from "react";
import { UploadForm } from "@/components/upload-form"; 
import { VideoGrid } from "@/components/video-grid";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase"; 

const auth = getAuth(firebaseApp);

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUploadMessage("");
      } else {
        setUser(null);
        setUploadMessage("You need to join first to upload a video.");
      }
    });

    return unsubscribe;
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setUploadMessage("");
    } catch (error) {
      console.error("Google login error: ", error);
    }
  };

  const handleGoogleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setUploadMessage("You need to join first to upload a video.");
      })
      .catch((error) => console.error("Logout error: ", error));
  };

  const handleUploadSuccess = (newVideo: any) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  return (
    <main className="bg-gradient-to-b from-silver-600 to-gray-600 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center mb-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-black">Vercast Video</h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition duration-300">
                <Upload className="mr-2 h-5 w-5" />
                Upload Video
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-6 bg-white rounded-xl shadow-lg">
              <DialogTitle className="text-2xl font-bold text-gray-800">Upload Video</DialogTitle>
              {user ? (
                <UploadForm onUploadSuccess={handleUploadSuccess} />
              ) : (
                <div className="text-red-500 text-center">{uploadMessage}</div>
              )}
            </DialogContent>
          </Dialog>

          {user ? (
            <>
              <p className="text-lg text-black font-medium text-center sm:text-left w-full sm:w-auto">
                Welcome, {user.displayName}
              </p>
              <Button
                onClick={handleGoogleLogout}
                className="w-full sm:w-auto bg-red-500 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              onClick={handleGoogleLogin}
              className="w-full sm:w-auto bg-green-500 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Join with Google
            </Button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <VideoGrid videos={videos} />
      </div>
    </main>
  );
}
