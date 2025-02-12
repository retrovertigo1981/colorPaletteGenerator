import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { ColorPalette } from "../components/ColorPalette.jsx";
import { Footer } from "../components/Footer.jsx";
import { generatePalette } from "../utils/generatePalette.js";
import { getFontColorByLightness } from "../utils/getFontColorByLightness";
import { fetchColorName } from "../utils/fetchColorName.js";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { Spinner } from "../components/Spinner.jsx";
import { UserInfoToast } from "../components/UserInfoToast.jsx";
import { LikedColorModal } from "../components/LikedColorModal.jsx";
import { SuccessSaveToast } from "../components/SuccessSaveToast.jsx";
import { Alert } from "../components/Alert.jsx";
import { Keyboard } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const App = () => {
  const [colors, setColors] = useState(new Array(5).fill(""));
  const [colorNames, setColorNames] = useState(new Array(5).fill(""));
  const [blockedColors, setBlockedColors] = useState(new Array(5).fill(false));
  const [likedColors, setLikedColors] = useState([]);
  const [showColorModal, setShowColorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  console.log(showAlert);

  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { palette } = useParams();

  const updateUrlWithColors = (colors) => {
    const colorString = colors.map((color) => color.replace("#", "")).join("-");
    navigate(`/generate/${colorString}`), { replace: true };
  };

  // Función para generar una nueva paleta respetando los colores bloqueados
  const generateNewPalette = useCallback(async () => {
    setIsLoading(true);
    try {
      const newPalette = colors.map((color, index) => {
        return blockedColors[index] ? color : generatePalette()[index];
      });

      const newColorNames = await Promise.all(
        newPalette.map(async (color) => await fetchColorName(color)),
      );

      setColors(newPalette);
      setColorNames(newColorNames);
      updateUrlWithColors(newPalette);
    } catch (error) {
      console.error("Error al generar la paleta:", error);
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
      if (event.code === "Space" && !showColorModal) {
        event.preventDefault();
        generateNewPalette();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [generateNewPalette, showColorModal]);

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

  const handleSaveColor = () => {
    // Mostrar el toast de guardado
    setShowSaveToast(true);

    // Ocultar el toast después de 3 segundos
    setTimeout(() => setShowSaveToast(false), 2000);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    console.log(showAlert);
  };

  return (
    <div className="flex flex-col h-screen relative">
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
      {showColorModal && (
        <LikedColorModal
          onClick={handleCloseColorModal}
          color={likedColors[0].toUpperCase()}
          onSave={handleSaveColor}
        />
      )}
      {showModal && !isMobile && (
        <UserInfoToast
          onClick={closeToast}
          text="Para generar paletas presione espacio en su teclado"
          icon={<Keyboard />}
        />
      )}
      {isMobile && <Footer generateNewPalette={generateNewPalette} />}
      {showSaveToast && <SuccessSaveToast />}
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
    </div>
  );
};

export default App;
