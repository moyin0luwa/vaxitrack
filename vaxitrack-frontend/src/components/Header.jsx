// src/components/Header.jsx

export default function Header() {
  return (
    <header className="bg-[#E6F7F9] text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold tracking-tight">
          Vaxi<span className="text-[#007C91]">TrackAI</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#dashboard" className="hover:text-[#007C91] transition">Dashboard</a>
          <a href="#vaccines" className="hover:text-[#007C91] transition">Vaccines</a>
          <a href="#records" className="hover:text-[#007C91] transition">Records</a>
        </nav>

        {/* Call to Action */}
        <div className="hidden md:block">
          <a
            href="#"
            className="bg-[#8BC34A] hover:bg-[#7CB342] text-white px-5 py-2 rounded-full text-sm font-semibold shadow"
          >
            Log Out
          </a>
        </div>
      </div>
    </header>
  );
}
