import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any concerns about inappropriate content, please report the video.
        </p>
        <p className="text-gray-600 mb-4">
          For faster communication, you can reach us via Telegram:{" "}
          <a
            href="https://t.me/vercastvideo"
            className="text-blue-500 hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @vercastvideo
          </a>
        </p>
        <p className="text-gray-600">
          You can also email us at:{" "}
          <a
            href="mailto:drtrailer2022@gmail.com"
            className="text-blue-500 hover:no-underline"
          >
            drtrailer2022@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
