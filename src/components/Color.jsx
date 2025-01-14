import { useState } from "react";

import { Copy, Lock, LockOpen, Heart, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile.js";

const Color = ({
  color,
  colorName,
  onBlock,
  isBlocked,
  isLiked,
  onLike,
  fontColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isMobile = useIsMobile();

  const habdleColorClick = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <div
      className="flex-1 min-h-[15vh] sm:h-full flex flex-col justify-center items-center relative"
      style={{ backgroundColor: color }}
      onClick={habdleColorClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <span
        className={`${
          fontColor === true ? "text-black" : "text-white"
        } text-lg sm:text-2xl font-bold mb-2 sm:mb-4`}
      >
        {color.toUpperCase().split("#")}
      </span>

      <div
        className={`flex space-x-2 border-none ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100 ${
          isMobile && !isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div onClick={copyToClipboard} className="p-2 sm:p-2 bg-transparent ">
          {isCopied ? (
            <CheckCircle2 className="sm:w-5 sm:h-5 text-green-300 border-none active:bg-none" />
          ) : (
            <Copy
              size={16}
              className={`${
                fontColor === true ? "text-gray-700" : "text-gray-200"
              } sm:w-5 sm:h-5`}
            />
          )}
        </div>
        <div onClick={onBlock} className="p-2 sm:p-2 bg-transparent">
          {!isBlocked ? (
            <LockOpen
              size={18}
              className={`${
                fontColor === true ? "text-gray-700" : "text-gray-200"
              }`}
            />
          ) : (
            <Lock size={18} color={!isBlocked ? "grey" : "red"} />
          )}
        </div>
        <div onClick={onLike} className="p-2 sm:p-2 bg-transparent">
          <Heart
            size={16}
            className={`sm:w-5 sm:h-5 ${
              fontColor === true ? "text-gray-700" : "text-gray-200"
            } ${isLiked ? "text-red-700" : "none"} `}
            fill={isLiked ? "red" : "none"}
          />
        </div>
      </div>
      {/* Nombre del color */}
      <span
        className={`${
          fontColor === true ? "text-gray-700" : "text-gray-300"
        } text-xs sm:text-base italic font-semibold `}
      >
        {colorName}
      </span>
    </div>
  );
};

export { Color };
