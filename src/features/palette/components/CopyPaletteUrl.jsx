import { Copy, CircleX } from "lucide-react";
const CopyPaletteUrl = ({ url, onToggle, onCopy }) => {
  return (
    <div className="absolute z-50 top-0 left-0 right-0 bottom-0 bg-gray-300 bg-opacity-70">
      <button
        className="absolute right-5 top-5 text-gray-800"
        onClick={onToggle}
      >
        <CircleX />
      </button>
      <div className="relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form className="max-w-sm mx-auto p-3">
          <label
            htmlFor="url"
            className="block mb-2 text-lg font-semibold text-black"
          >
            Copia la url de la paleta
          </label>
          <div className="flex">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={url}
            />
            <button
              className="bg-green-400 p-1 rounded-md ml-5"
              onClick={onCopy}
            >
              <Copy size={16} className="mx-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CopyPaletteUrl };
