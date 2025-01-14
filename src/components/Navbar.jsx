import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white text-black   p-2 sm:p-4">
      <Link to="/">
        <a
          href=""
          className="text-xl sm:text-2xl font-lobster flex items-center"
        >
          <span className="mr-2">
            <img src="/swatch-book.svg" alt="Colorsitos Logo" />
          </span>
          Colorsitos.app
        </a>
      </Link>
    </nav>
  );
};
