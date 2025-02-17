// import React from "react";
// import Link from "next/link";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-indigo-900 text-white py-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <p className="text-sm">
//           &copy; {new Date().getFullYear()} Vercast Video. All Rights Reserved.
//         </p>
//         <div className="space-x-6">
//           <Link href="/contact" className="text-white hover:text-indigo-300">Contact</Link>
//           <Link href="/disclaimer" className="text-white hover:text-indigo-300">Disclaimer</Link>
//           <Link href="/terms" className="text-white">Terms of Service</Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client"
import React, { useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFooter = () => {
    setIsOpen(!isOpen); // Toggle footer visibility for mobile view
  };

  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Copyright */}
        <p className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} Vercast Video. All Rights Reserved.
        </p>

        {/* Mobile Toggle Button */}
        <button
          className="text-white md:hidden"
          onClick={toggleFooter}
        >
          {isOpen ? "Hide Links" : "Show Links"}
        </button>

        {/* Links for desktop */}
        <div className="hidden md:flex space-x-6">
          <Link href="/contact" className="text-white hover:text-indigo-300">
            Contact
          </Link>
          <Link href="/disclaimer" className="text-white hover:text-indigo-300">
            Disclaimer
          </Link>
          <Link href="/terms" className="text-white hover:text-indigo-300">
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden space-y-4 mt-4 px-4 py-2 bg-indigo-900 rounded-lg`}
      >
        <Link href="/contact" className="block text-white text-lg py-2 hover:text-indigo-300">
          Contact
        </Link>
        <Link href="/disclaimer" className="block text-white text-lg py-2 hover:text-indigo-300">
          Disclaimer
        </Link>
        <Link href="/terms" className="block text-white text-lg py-2 hover:text-indigo-300">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
