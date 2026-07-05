import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="StudySync Logo"
            className="w-12 h-12 object-contain"
          />

          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-gray-900">Study</span>
            <span className="text-violet-600">Sync</span>
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-indigo-600 font-medium transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition"
          >
            Get Started
          </Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-5 flex flex-col gap-5">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium"
              >
                {item.name}
              </a>
            ))}

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-center font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
