// "use client"
// import { useState } from "react";
// import Link from "next/link"; // Use Next.js Link for navigation

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen); // Toggle navbar visibility on mobile
//   };

//   return (
//     <nav className="bg-indigo-900 p-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">Vercast Video</h1>
//         <button
//           className="text-white md:hidden"
//           onClick={toggleNavbar}
//         >
//           {isOpen ? "Close" : "Menu"} {/* Toggle button */}
//         </button>
//         <div
//           className={`${isOpen ? "block" : "hidden"} md:flex space-x-6`} // Show links in desktop and toggle in mobile
//         >
//           <Link href="/" className="text-white">Home</Link>
//           <Link href="/contact" className="text-white">Contact</Link>
//           <Link href="/disclaimer" className="text-white">Disclaimer</Link>
//           <Link href="/terms" className="text-white">Terms of Service</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




"use client";
import { useState } from "react";
import Link from "next/link"; // Use Next.js Link for navigation
import { Menu, X } from "lucide-react"; // Add icons for the menu (hamburger) and close (X)

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle navbar visibility on mobile
  };

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-white text-3xl font-bold">
          Vercast Video
        </h1>

        {/* Right-side Links for Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:no-underline">
            Home
          </Link>
          <Link href="/contact" className="text-white hover:no-underline">
            Contact
          </Link>
          <Link href="/disclaimer" className="text-white hover:no-underline">
            Disclaimer
          </Link>
          <Link href="/terms" className="text-white hover:no-underline">
            Terms of Service
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-1/4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
          />
          <button className="p-2 bg-blue-500 text-white rounded-r-lg">
            <span className="h-5 w-5">🔍</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="text-white md:hidden"
          onClick={toggleNavbar}
        >
          {isOpen ? (
            <X className="h-6 w-6" /> // Close icon when menu is open
          ) : (
            <Menu className="h-6 w-6" /> // Hamburger menu icon when menu is closed
          )}
        </button>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden space-y-4 mt-4 px-4 py-2 bg-black rounded-lg shadow-lg`}
      >
        <Link href="/" className="block text-white text-xl py-2 hover:no-underline">
          Home
        </Link>
        <Link href="/contact" className="block text-white text-xl py-2 hover:no-underline">
          Contact
        </Link>
        <Link href="/disclaimer" className="block text-white text-xl py-2 hover:no-underline">
          Disclaimer
        </Link>
        <Link href="/terms" className="block text-white text-xl py-2 hover:no-underline">
          Terms of Service
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
