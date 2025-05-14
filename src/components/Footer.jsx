import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full text-center text-sm text-yellow-300 py-4 border-t border-purple-500/30 bg-black/30 backdrop-blur-md shadow-[0_0_10px_#a855f7] mt-10">
      Made with ❤️ by{' '}
      <span className="text-pink-400 font-bold">Amit Kumar</span> •{' '}
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:underline"
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
