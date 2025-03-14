import { Link } from "react-router-dom";
const AnimatedGradientBackground = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-3xl z-10"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#2f8edc] animate-pulse mix-blend-screen blur-3xl"></div>

        <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-[#f20de0] animate-bounce mix-blend-screen blur-3xl"></div>

        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#6851d2] animate-pulse mix-blend-screen blur-3xl"></div>

        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-[#f2e011] animate-bounce mix-blend-screen blur-3xl"></div>

        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-[#7af8ed] animate-pulse mix-blend-screen blur-3xl"></div>
      </div>

      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <Link to="/" className="inline-block">
          <span className="text-xl p-5 sm:text-6xl font-lobster flex items-center">
            <span className="mr-2">
              <img
                className="w-14"
                src="/swatch-book.svg"
                alt="Colorsitos Logo"
              />
            </span>
            Colorsitos.app
          </span>
        </Link>
      </div>
    </div>
  );
};

export { AnimatedGradientBackground };
