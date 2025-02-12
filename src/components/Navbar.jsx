import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logout:", error);
    }
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

          {!user && (
            <>
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
                  className="flex items-center text-white hover:text-gray-200"
                >
                  Sign In
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                  aria-label="User menu"
                >
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={user.photoURL}
                    alt={`${user.email} profile picture`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-xs text-gray-900">
                      {user ? <div>{user.displayName}</div> : null}
                      <div className="text-sm">{user.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          className="px-4 py-2 flex items-center hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout <LogOut className="ml-1" size={14} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>

        {/* Botón del menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 transition-all duration-300 opacity-100 translate-y-0 z-40">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/about"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/generate"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu}
              >
                Generate
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block text-gray-800 hover:text-gray-600 p-2"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-gray-800 hover:text-gray-600 p-2"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block text-gray-800 hover:text-gray-600 p-2"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left text-gray-800 hover:text-gray-600 p-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
