import { useState, useRef, useEffect } from "react";
import { ColorSavePalette } from "./ColorSavePalette";
import { PDFPaletteExporter } from "./PDFPaletteExporter";
import { exportToPDF } from "../utils/exportToPDF";
import { Trash2, EllipsisVertical, Link, FileText } from "lucide-react";

const CardPaletteSaved = ({
  colors,
  namePalette,
  description,
  onDelete,
  onCopy,
  palette,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPDFExporter, setShowPDFExporter] = useState(false);
  const toggleButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  console.log(palette);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleShowPDFExporter = (palette) => {
    // setShowPDFExporter(true);
    exportToPDF(palette);
  };

  // useEffect(() => {
  //   if (showPDFExporter) {
  //     setTimeout(() => {
  //       exportToPDF();
  //       setShowPDFExporter(false); // Ocultar el componente después de generar el PDF
  //     }, 100); // Espera 100ms para que el contenido se renderice
  //   }
  // }, [showPDFExporter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleButtonRef.current &&
        dropdownRef.current &&
        !toggleButtonRef.current.contains(event.target)
        // && !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-80 md:w-auto bg-white rounded-lg">
      <div className="flex flex-row h-28 rounded-lg overflow-hidden">
        {colors.map((color, index) => (
          <ColorSavePalette key={index} color={color} />
        ))}
      </div>
      <div className="p-2">
        <div className="flex flex-col">
          <h3 className="mb-3 tracking-tight truncate text-md font-bold">
            {namePalette}
          </h3>
          <p className="mb-3 tracking-tight truncate" title={description}>
            {description}
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <button onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" />
        </button>
        <button
          ref={toggleButtonRef}
          onClick={toggleDropdown}
          aria-label="palette menu"
        >
          <EllipsisVertical className="w-4 h-4" />
        </button>
        <div className="relative" ref={dropdownRef}>
          {isDropdownOpen && (
            <div className="absolute z-50 right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 mb-3">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  className="p-2 hover:bg-gray-100 flex items-center font-medium"
                  onClick={onCopy}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Compartir URL
                </li>
                <li
                  className="p-2 hover:bg-gray-100 flex items-center font-medium"
                  onClick={() => handleShowPDFExporter(palette)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* {showPDFExporter && <PDFPaletteExporter palette={palette} />} */}
    </div>
  );
};

export { CardPaletteSaved };
