import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { ColorPalette } from "../components/ColorPalette.jsx";
import { Footer } from "../components/Footer.jsx";
import { generatePalette } from "../utils/generatePalette.js";
import { getFontColorByLightness } from "../utils/getFontColorByLightness";
import { fetchColorName } from "../utils/fetchColorName.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { Spinner } from "../components/Spinner.jsx";

const App = () => {
  const [colors, setColors] = useState(new Array(5).fill(""));
  const [colorNames, setColorNames] = useState(new Array(5).fill(""));
  const [blockedColors, setBlockedColors] = useState(new Array(5).fill(false));
  const [likedColors, setLikedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();
  // const firstRender = useRef(true);

  // Función para generar una nueva paleta respetando los colores bloqueados
  const generateNewPalette = useCallback(async () => {
    setIsLoading(true);
    const newPalette = colors.map((color, index) => {
      return blockedColors[index] ? color : generatePalette()[index];
    });

    const newColorNames = await Promise.all(
      newPalette.map(async (color) => await fetchColorName(color)),
    );

    setColors(newPalette);
    setColorNames(newColorNames);
    setIsLoading(false);
  }, [colors, blockedColors]);

  // Generar la paleta inicial solo una vez al montar el componente
  useEffect(() => {
    // if (firstRender.current) {
    //   firstRender.current = false;
    //   return;
    // }
    generateNewPalette();
  }, []);

  // Escuchar la barra espaciadora para ambiar la paleta
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        generateNewPalette();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [generateNewPalette]);

  const handleBlockColor = (index) => {
    const updatedBlockedColors = [...blockedColors];
    updatedBlockedColors[index] = !blockedColors[index];
    setBlockedColors(updatedBlockedColors);
  };

  const handleLikeColor = (color) => {
    const updateLikedColors = likedColors.includes(color)
      ? likedColors.filter((likedColor) => likedColor !== color)
      : [...likedColors, color];
    setLikedColors(updateLikedColors);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <ColorPalette
          colors={colors}
          colorNames={colorNames}
          blockedColors={blockedColors}
          onBlockColor={handleBlockColor}
          likedColors={likedColors}
          onLikeColor={handleLikeColor}
          getFontColor={getFontColorByLightness}
        />
      )}
      {isMobile && <Footer generateNewPalette={generateNewPalette} />}
    </div>
  );
};

export default App;
