import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#0b0b1a] via-[#1a0f2e] to-[#0b0b1a] text-yellow-300 text-base font-extrabold px-4 py-3 flex flex-wrap justify-between items-center shadow-[0_0_14px_#a259ff] border-b border-[#a259ff]">

      {/* Logo */}
      <div className="text-2xl font-extrabold flex items-center drop-shadow-[0_0_6px_#fffa]">
        <span className="text-pink-700">&lt;</span>
        Pass
        <span className="text-pink-700">OP/&gt;</span>
      </div>

      {/* GitHub Button */}
      <div className="mt-2 md:mt-0 flex items-center gap-4">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-yellow-300 border border-[#a259ff] px-4 py-1.5 rounded-md shadow-[0_0_12px_#a259ff] hover:shadow-[0_0_20px_#a259ff] transition-all duration-300 ease-in-out text-sm"
        >
          {/* GitHub Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-yellow-300"
          >
            <path d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.387c.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.091-.747.083-.732.083-.732 1.205.086 1.84 1.238 1.84 1.238 1.072 1.834 2.812 1.304 3.495.997.108-.775.42-1.304.763-1.603-2.665-.303-5.466-1.335-5.466-5.933 0-1.31.469-2.381 1.237-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.53 11.53 0 013.004-.404c1.02.005 2.045.137 3.004.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.626-5.476 5.922.431.372.816 1.102.816 2.222v3.293c0 .32.192.694.8.576A12.006 12.006 0 0024 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
