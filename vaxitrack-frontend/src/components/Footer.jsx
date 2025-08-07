export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0B345A] via-[#113e6a] to-[#15548a] text-white py-10 px-6 font-sans mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold mb-1">
            Vaxi<span className="text-cyan-400">Track</span>
          </div>
          <p className="text-sm text-cyan-200 max-w-xs">
            Empowering Mothers, Protecting Children.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-cyan-300 transition">
            Home
          </a>
          <a href="#" className="hover:text-cyan-300 transition">
            About
          </a>
          <a href="#" className="hover:text-cyan-300 transition">
            Contact
          </a>
        </nav>

        {/* Contact Email */}
        <div className="text-sm text-cyan-300 hover:text-cyan-400 transition cursor-pointer">
          Contact us:{" "}
          <a href="mailto:support@vaxitrack.ai" className="underline">
            support@vaxitrack.ai
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-cyan-300">
          <a href="#" aria-label="Facebook" className="hover:text-cyan-400 transition">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22 12a10 10 0 10-11.5 9.8v-6.9h-2.6v-2.9h2.6V9.8c0-2.6 1.6-4 4-4 1.2 0 2.5.2 2.5.2v2.8h-1.4c-1.3 0-1.7.8-1.7 1.6v1.9h2.9l-.5 2.9h-2.4v6.9A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-cyan-400 transition">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M23 3a10.9 10.9 0 01-3.14.85A4.48 4.48 0 0022.4 1.6a9.05 9.05 0 01-2.88 1.1A4.52 4.52 0 0016.88 0c-2.5 0-4.5 2-4.5 4.5 0 .35.03.7.1 1.04A12.84 12.84 0 013 1.64 4.48 4.48 0 001.67 3.4a4.48 4.48 0 002 3.75 4.48 4.48 0 01-2.05-.56v.06c0 2.2 1.55 4 3.61 4.42a4.5 4.5 0 01-2.04.08c.57 1.78 2.24 3.08 4.22 3.12A9.07 9.07 0 010 19.54a12.82 12.82 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-cyan-700 pt-6 text-center text-xs text-cyan-300">
        &copy; {new Date().getFullYear()} VaxiTrack. All rights reserved.
      </div>
    </footer>
  );
}
