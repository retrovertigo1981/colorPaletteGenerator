const PDFPaletteExporter = ({ palette }) => {
  return (
    <div
      id="pdf-content"
      className="absolute z-50"
      style={{
        left: "0",
        top: "0",
        opacity: 0,
        width: "260mm",
        height: "210mm",
        overflow: "hidden",
      }}
    >
      <div
        className="pdf-content-inner p-6 bg-white rounded shadow-lg text-gray-800"
        style={{ width: "90%", height: "90%", boxSizing: "border-box" }}
      >
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
          {palette.colors.map((color, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div
                className="w-full h-64 border border-gray-300 rounded shadow"
                style={{ backgroundColor: color }}
              />
              <p className="mt-2 text-sm font-semibold text-gray-800">
                {color}
              </p>
            </div>
          ))}
        </div>
        <span className="text-xl sm:text-2xl font-lobster flex items-center">
          Colorsitos.app
        </span>
      </div>
    </div>
  );
};

export { PDFPaletteExporter };
