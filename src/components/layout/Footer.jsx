import { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { Share2, CloudUpload } from "lucide-react";

export const Footer = ({
  generateNewPalette,
  onToggleUrl,
  onToggleSavePalette,
}) => {
  const [isGenerateUrl, setIsGenerateUrl] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("generate")) {
      setIsGenerateUrl(true);
    } else {
      setIsGenerateUrl(false);
    }
  }, [location, isGenerateUrl]);
  return (
    <footer className="bg-white text-black p-2 sm:p-4 flex justify-around items-center">
      <button
        className=" bg-white border-2 border-gray-300 text-black font-semibold py-2 px-2 rounded-md"
        onClick={generateNewPalette}
      >
        Generate
      </button>
      <ul className="flex items-center space-x-4">
        {isGenerateUrl && (
          <>
            {user && (
              <li>
                <CloudUpload
                  size={20}
                  className="text-gray-800 hover:text-gray-600 cursor-pointer"
                  onClick={onToggleSavePalette}
                />
              </li>
            )}
            <li>
              <Share2
                size={18}
                className="text-gray-800 hover:text-gray-600 cursor-pointer"
                onClick={onToggleUrl}
              />
            </li>
          </>
        )}
      </ul>
      <p className="text-sm sm:text-base text-center">
        Hecho con ❤️ por{" "}
        <a
          href="https://github.com/retrovertigo1981"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sebastián Peña
        </a>
      </p>
    </footer>
  );
};
