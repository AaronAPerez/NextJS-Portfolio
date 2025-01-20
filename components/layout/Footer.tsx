'use client';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-blue-500/10 py-12 text-center text-gray-400">
    <div className="max-w-7xl mx-auto px-4">
      <p>&copy; {new Date().getFullYear()} Aaron A. Perez. All rights reserved.</p>
      <div className="mt-4 flex justify-center space-x-6">
        <a
          href="https://https://github.com/AaronAPerez"
          className="hover:text-blue-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          GitHub
        </a>
        <a
          href="https://https://www.linkedin.com/in/aaronaperezdev/"
          className="hover:text-blue-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          LinkedIn
        </a>
        <a
          href="mailto:aaron.aaperez06@gmail.com"
          className="hover:text-blue-400 transition-colors"
          aria-label="Email Contact"
        >
          Email
        </a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;