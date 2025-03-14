import { Trash2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const CardColorFavorite = ({ color, colorName, onDelete }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };
  return (
    <>
      <div className="w-80 md:w-auto bg-white rounded-lg">
        <div className="h-28 rounded-lg" style={{ background: color }}></div>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <p className="mb-3 tracking-tight truncate">{colorName}</p>
            <div className="flex">
              {isCopied ? (
                <CheckCircle2 size={16} className="mr-2 text-green-500" />
              ) : (
                <Copy
                  size={16}
                  className="cursor-pointer mr-2"
                  onClick={copyToClipboard}
                />
              )}
              <Trash2 size={16} className="cursor-pointer" onClick={onDelete} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardColorFavorite };
