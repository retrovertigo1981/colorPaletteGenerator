import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-2 sm:p-4 z-40">
      <div className="flex w-full justify-between items-center">
        {/* Logo y nombre */}
        <Link to="/" className="inline-block">
          <span className="text-xl sm:text-2xl font-lobster flex items-center">
            <span className="mr-2">
              <img src="/swatch-book.svg" alt="Colorsitos Logo" />
            </span>
            Colorsitos.app
          </span>
        </Link>

        {/* Menú para pantallas grandes */}
        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <Link to="/about" className="text-gray-800 hover:text-gray-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/generate" className="text-gray-800 hover:text-gray-600">
              Generate
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-gray-800 hover:text-gray-600">
              Dashboard
            </Link>
          </li>
          <li className="border border-gray-800 rounded-lg p-2">
            <Link
              to="/login"
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              Login <LogIn className="ml-1" size={18} />
            </Link>
          </li>
          <li className="border border-green-600 bg-green-600 rounded-lg py-2 px-4">
            <Link
              to="/register"
              className="flex items-center text-white hover:text-gray-600"
            >
              Sign In
            </Link>
          </li>
        </ul>

        {/* Ícono del menú para pantallas pequeñas */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div
          className={`md:hidden mt-2 transition-all duration-300  ${isMenuOpen ? "opacity-100 translate-y-0 z-40" : "opacity-0 -translate-y-2 "}`}
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/about"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu} // Cierra el menú al hacer clic en un enlace
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/generate"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu} // Cierra el menú al hacer clic en un enlace
              >
                Generate
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu} // Cierra el menú al hacer clic en un enlace
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu} // Cierra el menú al hacer clic en un enlace
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
