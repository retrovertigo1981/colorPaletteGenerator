import { Trash2 } from "lucide-react";

const CardColorFavorite = ({ color, colorName, onDelete }) => {
  return (
    <>
      <div className="w-80 md:w-auto bg-white rounded-lg">
        <div className="h-28 rounded-lg" style={{ background: color }}></div>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <p className="mb-3 tracking-tight">{colorName}</p>
            <Trash2 size={16} className="cursor-pointer" onClick={onDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export { CardColorFavorite };
