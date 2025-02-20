"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ✅ Fetch video data from API
async function getVideo(slug: string) {
  if (!slug) return null;
  try {
    const response = await fetch("/api/list", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch video data");

    const data = await response.json();
    return data.items?.find((video: any) => video.slug === slug) || null;
  } catch (error) {
    console.error("❌ Error fetching video:", error);
    return null;
  }
}

// ✅ Fetch all videos for recommendations
async function getAllVideos() {
  try {
    const response = await fetch("/api/list", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch video list");

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    return [];
  }
}

// ✅ Fetch GitHub info.json for thumbnails
async function fetchGithubInfo() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/rndsouza2024/info/main/info.json",
      { cache: "no-store" } // ✅ Ensures fresh data
    );
    if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);

    return await response.json();
  } catch (error) {
    console.warn("❌ Failed to fetch GitHub info.json:", error);
    return {};
  }
}

export default function WatchPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [githubThumbnails, setGithubThumbnails] = useState<Record<string, any>>({});
  const [showAd, setShowAd] = useState(true); // State to control the ad visibility
  const [adSkipped, setAdSkipped] = useState(false);
  const [skipButtonVisible, setSkipButtonVisible] = useState(false); // Control skip button visibility
  const [countdown, setCountdown] = useState(8); // Countdown timer
  const [showPopupAd, setShowPopupAd] = useState(false); // State for popup ad visibility

  // Directly set the ad video URLs
  const adVideoUrl = "https://res.cloudinary.com/dm37icb6j/video/upload/v1739845637/main_zmp0bz.mp4"; 
  const popupAdUrl = "https://res.cloudinary.com/dm37icb6j/video/upload/v1739803773/AD1_jr0ngh.mp4"; 

  useEffect(() => {
    async function fetchData() {
      if (!params || !params.slug) {
        console.error("❌ Invalid video slug");
        return;
      }

      setLoading(true);

      const [videoData, allVideos, githubData] = await Promise.all([getVideo(params.slug), getAllVideos(), fetchGithubInfo()]);

      if (!videoData) {
        router.push("/404");
        return;
      }

      // ✅ Apply GitHub thumbnail & description if available
      const githubInfo = githubData[videoData.name] || {};

      setVideo({
        ...videoData,
        thumbnailUrl: githubInfo?.thumbnailUrl ?? videoData?.thumbnailUrl ?? "", // ✅ Safe fallback
        description: githubInfo?.description ?? videoData?.description ?? "No description available",
      });

      // ✅ Store GitHub thumbnails for recommended videos
      setGithubThumbnails(githubData);

      // ✅ Prepare recommended videos
      const filteredVideos = allVideos
        .filter((v) => v.slug !== params.slug)
        .map((video) => {
          const githubInfo = githubData[video.name] || {};
          return {
            ...video,
            thumbnailUrl: githubInfo?.thumbnailUrl ?? video?.thumbnailUrl ?? "", // ✅ Correct thumbnail assignment
            description: githubInfo?.description ?? video?.description ?? "No description available",
          };
        });

      shuffleVideos(filteredVideos);
      setLoading(false);
    }

    fetchData();
  }, [params.slug]);

  // Countdown logic for the ad
  useEffect(() => {
    if (showAd && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval when countdown ends
    } else if (countdown === 0) {
      setSkipButtonVisible(true);
    }
  }, [showAd, countdown]);

  // Logic to show and loop the popup ad
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopupAd(true);
    }, 15000); // Show ad popup after 15 seconds

    const loopPopupAd = setInterval(() => {
      if (!showPopupAd) {
        setShowPopupAd(true); // Re-show popup ad every 15 seconds after it's closed
      }
    }, 15000); // Loop every 15 seconds

    return () => {
      clearTimeout(popupTimer);
      clearInterval(loopPopupAd); // Cleanup interval on component unmount
    };
  }, [showPopupAd]);

  function shuffleVideos(videos: any[]) {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setRecommended(shuffled.slice(0, 4));
  }

  const handleAdSkip = () => {
    setAdSkipped(true);
    setShowAd(false);
  };

  const handleAdEnd = () => {
    setAdSkipped(true);
    setShowAd(false);
  };

  const handlePopupAdClose = () => {
    setShowPopupAd(false);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-gray-100 py-8 px-4 relative">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* ✅ Ad Video Overlay */}
      {showAd && !adSkipped && (
        <div className="relative w-full aspect-video mb-4">
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
            <div className="relative w-full h-full">
              {/* <a href="https://amazonaffiliatestore.vercel.app/" target="_blank" rel="noopener noreferrer"> */}
                <video
                  autoPlay
                  muted
                  loop
                  onEnded={handleAdEnd}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    // borderRadius: "50px", // Rounded corners for the image
                    boxShadow: "0 0 10px 0 #000", // Shadow effect
                    filter:
                      "contrast(1.2) saturate(1.2) brightness(1.2) hue-rotate(0deg)", // Image filter effects
                  }}
                >
                  <source src={adVideoUrl} type="video/mp4" />
                </video>
              {/* </a> */}
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg">Skip the ad in {countdown} sec.</p>
                {skipButtonVisible && (
                  <button
                    onClick={handleAdSkip}
                    className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                  >
                    Skip Ad
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Video Embed (Only after ad is skipped) */}
      {!showAd && (
        <div className="aspect-video relative mb-4">
          <iframe
            src={`https://short.icu/${video.slug}?thumbnail=${encodeURIComponent(video.thumbnailUrl)}`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            style={{
              // borderRadius: "50px", // Rounded corners for the image
              boxShadow: "0 0 10px 0 #000", // Shadow effect
              filter:
              "contrast(1.2) saturate(1.2) brightness(1.2) hue-rotate(0deg)", // Image filter effects
            }}
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{video.name.replace(/\.[^/.]+$/, "")}</h1>
      <p className="text-lg text-gray-700">{video.description}</p>
      <p className="text-sm text-gray-500">Resolution: {video.resolution}p</p>
      <p className="text-gray-500">Status: {video.status}</p>

      {/* ✅ Popup Ad */}
      {showPopupAd && (
        <div className="fixed bottom-5 right-5 w-80 bg-black text-white p-4 rounded-lg shadow-lg z-50">
          {/* ✅ Ad Badge placed outside the video, above the entire container */}
          <div className="absolute top-4 left-4  text-white px-4 py-2 rounded-full text-xs font-semibold z-10">
            Advertisment
          </div>

          <button
            onClick={handlePopupAdClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white z-20"
          >
            ✖
          </button>

          {/* ✅ Video Player */}
          <a href="https://amazonaffiliatestore.vercel.app/" target="_blank" rel="noopener noreferrer">
            <video autoPlay muted loop className="w-full rounded-lg mt-8"  style={{
              // borderRadius: "50px", // Rounded corners for the image
              boxShadow: "0 0 10px 0 #000", // Shadow effect
              filter:
              "contrast(1.2) saturate(1.2) brightness(1.2) hue-rotate(0deg)", // Image filter effects
            }}>
              <source src={popupAdUrl} type="video/mp4" />
            </video>
          </a>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Recommended Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended.map((recVideo, index) => (
          <Link key={index} href={`/watch/${recVideo.slug}`}>
            <div className="group cursor-pointer p-4 border bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                {recVideo.thumbnailUrl ? (
                  <Image
                    src={recVideo.thumbnailUrl}
                    alt="Recommended Video Thumbnail"
                    width={320}
                    height={180}
                    className="rounded-lg object-cover"
                    style={{
                      // borderRadius: "50px", // Rounded corners for the image
                      boxShadow: "0 0 10px 0 #000", // Shadow effect
                      filter:
                      "contrast(1.2) saturate(1.2) brightness(1.2) hue-rotate(0deg)", // Image filter effects
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full">
                    ❌ No Thumbnail Available
                  </div>
                )}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{recVideo.name.replace(/\.[^/.]+$/, "")}</h3>
              <p className="text-sm text-gray-600">{recVideo.description}</p>
              <p className="text-sm text-gray-400">Resolution: {recVideo.resolution}p</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
