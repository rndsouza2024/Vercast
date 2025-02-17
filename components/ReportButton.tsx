import React from "react";

interface ReportButtonProps {
  videoId: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({ videoId }) => {
  const handleReport = () => {
    // Placeholder logic for reporting the video
    console.log(`Reported video with ID: ${videoId}`);
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      onClick={handleReport}
    >
      Report Video
    </button>
  );
};

export default ReportButton;
