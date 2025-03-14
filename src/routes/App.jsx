import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { ColorPalette } from "../features/palette/components/ColorPalette.jsx";
import { LikedColorModal } from "../features/palette/components/LikedColorModal.jsx";
import { SavePalette } from "../features/palette/components/SavePalette.jsx";
import { CopyPaletteUrl } from "../features/palette/components/CopyPaletteUrl.jsx";
import { Spinner } from "../components/UI/Spinner.jsx";
import { UserInfoToast } from "../components/shared/UserInfoToast.jsx";
import { SuccessToast } from "../components/UI/SuccessToast.jsx";
import { Alert } from "../components/UI/Alert.jsx";
import { generatePalette } from "../utils/generatePalette.js";
import { getFontColorByLightness } from "../utils/getFontColorByLightness";
import { fetchColorName } from "../utils/fetchColorName.js";
import { useIsMobile } from "../hooks/useIsMobile.js";

import { Keyboard, Save } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const App = () => {
  const [colors, setColors] = useState(new Array(5).fill(""));
  const [colorNames, setColorNames] = useState(new Array(5).fill(""));
  const [blockedColors, setBlockedColors] = useState(new Array(5).fill(false));
  const [likedColors, setLikedColors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showColorModal, setShowColorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const [showToastUrl, setShowToastUrl] = useState(false);
  const [showSavePalette, setShowSavePalette] = useState(false);
  // console.log(showAlert);

  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { palette } = useParams();
  const location = useLocation();
  const fullUrl = window.location.origin + location.pathname;

  const updateUrlWithColors = (colors) => {
    const colorString = colors.map((color) => color.replace("#", "")).join("-");
    navigate(`/generate/${colorString}`), { replace: true };
  };

  // Función para generar una nueva paleta respetando los colores bloqueados
  const generateNewPalette = useCallback(async () => {
    setIsLoading(true);
    try {
      const newPalette = colors.map((color, index) =>
        blockedColors[index] ? color : generatePalette()[index],
      );
      const newColorNames = await Promise.all(
        newPalette.map(async (color) => await fetchColorName(color)),
      );
      setColors(newPalette);
      setColorNames(newColorNames);
      updateUrlWithColors(newPalette);
    } catch (error) {
      console.error("Error al generar la paleta:", error);
      setShowAlert(true);
      setErrorMessage("No se pudo generar la paleta. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, [colors, blockedColors]);

  // Generar la paleta inicial solo una vez al montar el componente
  useEffect(() => {
    if (palette) {
      const colorsFromUrl = palette.split("-").map((color) => `#${color}`);
      setColors(colorsFromUrl);
      Promise.all(
        colorsFromUrl.map(async (color) => await fetchColorName(color)),
      )
        .then((names) => setColorNames(names))
        .catch((error) =>
          console.error("Error al obtener nombres de colores:", error),
        );
    } else {
      generateNewPalette();
    }
  }, [palette]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const toast = document.getElementById("toast-default");
      toast.style.cssText = "opacity: 1; transition: opacity 0.5s ease-in-out;";
      setShowModal(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  // Escuchar la barra espaciadora para ambiar la paleta
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (
        event.code === "Space" &&
        !showColorModal &&
        !showCopyUrl &&
        !showSavePalette
      ) {
        event.preventDefault();
        generateNewPalette();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [generateNewPalette, showColorModal, showCopyUrl, showSavePalette]);

  const handleBlockColor = (index) => {
    const updatedBlockedColors = [...blockedColors];
    updatedBlockedColors[index] = !blockedColors[index];
    setBlockedColors(updatedBlockedColors);
  };

  const handleLikeColor = (color) => {
    if (!user) return setShowAlert(true);
    const updateLikedColors = likedColors.includes(color)
      ? likedColors.filter((likedColor) => likedColor !== color)
      : [...likedColors, color];
    setLikedColors(updateLikedColors);
    updateLikedColors ? setShowColorModal(true) : setShowColorModal(false);
  };

  const handleCloseColorModal = () => {
    setShowColorModal(false);
    setLikedColors([]);
  };

  const closeToast = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    // Mostrar el toast de guardado
    setShowSuccessToast(true);

    // Ocultar el toast después de 3 segundos
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const toggleShowCopyURL = () => {
    setShowCopyUrl(!showCopyUrl);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(fullUrl);
    setShowCopyUrl(false);
    setShowToastUrl(true);
    setTimeout(() => setShowToastUrl(false), 2000);
  };

  const toggleSavePalette = () => {
    setShowSavePalette(!showSavePalette);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Navbar
        onToggleUrl={toggleShowCopyURL}
        onToggleSavePalette={toggleSavePalette}
      />
      {showCopyUrl && (
        <CopyPaletteUrl
          onToggle={toggleShowCopyURL}
          url={fullUrl}
          onCopy={handleCopy}
        />
      )}

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
      {showColorModal && (
        <LikedColorModal
          onClick={handleCloseColorModal}
          color={likedColors[0].toUpperCase()}
          onSave={handleSave}
        />
      )}
      {showModal && !isMobile && (
        <UserInfoToast
          onClick={closeToast}
          text="Para generar paletas presione espacio en su teclado"
          icon={<Keyboard />}
        />
      )}
      {isMobile && (
        <Footer
          generateNewPalette={generateNewPalette}
          onToggleUrl={toggleShowCopyURL}
          onToggleSavePalette={toggleSavePalette}
        />
      )}
      {showSuccessToast && (
        <SuccessToast
          icon={<Save className="w-4 h-4" />}
          message={"Elemento Guardado exitosamente"}
        />
      )}
      {showToastUrl && <SuccessToast message={"URL copiada al portapapeles"} />}
      {showAlert && (
        <Alert
          message="Para guardar un color, primero tienes que"
          links={[
            { to: "/login", text: "iniciar sesión" },
            { to: "/register", text: "Registrarse" },
          ]}
          onClose={handleCloseAlert}
          variant="warning"
        />
      )}
      {showSavePalette && (
        <SavePalette
          colors={colors}
          onClose={toggleSavePalette}
          onSave={handleSave}
          fullUrl={fullUrl}
        />
      )}
      {showAlert && (
        <Alert
          message={errorMessage}
          onClose={() => setShowAlert(false)}
          variant="error"
        />
      )}
    </div>
  );
};

export default App;
