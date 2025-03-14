import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Navbar } from "../../../components/layout/Navbar";
import { Alert } from "../../../components/UI/Alert";
import { DeleteColorModal } from "../components/DeleteColorModal";
import { DeletePaletteModal } from "../components/DeletePaletteModal";
import { CardColorFavorite } from "../components/CardColorFavorite";
import { CardPaletteSaved } from "../components/CardPaletteSaved";
import { SuccessToast } from "../../../components/UI/SuccessToast";
import { LayoutDashboard, PaintBucket, Palette } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

const Dashboard = () => {
  const [favColors, setFavColors] = useState([]);
  const [favPalettes, setFavPalettes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLikedColors, setShowLikedColors] = useState(true);
  const [showPalettes, setShowPalettes] = useState(false);
  const [showDeleteCorlorModal, setShowDeleteColorModal] = useState(false);
  const [showDeletePaletteModal, setShowDeletePaletteModal] = useState(false);
  const [showToastUrl, setShowToastUrl] = useState(false);
  const [colorHex, setColorHex] = useState("");
  const [colorName, setColorName] = useState("");
  const [palette, setPalette] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    return setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowLikedColors = () => {
    setShowLikedColors(true);
    setShowPalettes(false);
    setIsSidebarOpen(false);
  };

  const handleShowPalettes = () => {
    setShowPalettes(true);
    setShowLikedColors(false);
    setIsSidebarOpen(false);
  };

  const toggleDeleteModal = (color, nombre) => {
    setShowDeleteColorModal(!showDeleteCorlorModal);
    setColorHex(color);
    setColorName(nombre);
  };

  const toggleDeletePaletteModal = (palette) => {
    setShowDeletePaletteModal(!showDeletePaletteModal);
    setPalette(palette);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setShowToastUrl(true);
    setTimeout(() => {
      setShowToastUrl(false);
    }, 2000);
  };

  useEffect(() => {
    if (user?.uid) {
      const db = getDatabase();
      const favoriteColorsRef = ref(db, `favoriteColors/${user.uid}`);
      const favoritePalettesRef = ref(db, `favoritePalettes/${user.uid}`);

      const getColors = onValue(
        favoriteColorsRef,
        (snapshot) => {
          const data = snapshot.val();
          setFavColors(
            data
              ? Object.entries(data).map(([key, color]) => ({ ...color, key }))
              : [],
          );
        },
        (error) => {
          console.error("Error al cargar colores favoritos:", error);
          setShowAlert(true);
        },
      );

      const getPalettes = onValue(
        favoritePalettesRef,
        (snapshot) => {
          const data = snapshot.val();
          setFavPalettes(
            data
              ? Object.entries(data).map(([key, palette]) => ({
                  ...palette,
                  key,
                }))
              : [],
          );
        },
        (error) => {
          console.error("Error al cargar paletas favoritas:", error);
          setShowAlert(true);
        },
      );

      return () => {
        getColors();
        getPalettes();
      };
    }
  }, [user]);

  const handleDeleteColor = (hex) => {
    if (!user?.uid) return;

    const db = getDatabase();

    const colorToDelete = favColors.find((color) => color.colorHex === hex);
    if (!colorToDelete || !colorToDelete.key) return;

    const colorRef = ref(db, `favoriteColors/${user.uid}/${colorToDelete.key}`);

    setTimeout(() => {
      remove(colorRef)
        .then(() => {
          console.log("Color eliminado de Firebase correctamente");

          const updatedColors = favColors.filter(
            (color) => color.colorHex !== hex,
          );
          setFavColors(updatedColors);
        })
        .catch((error) => {
          console.error("Error al eliminar el color de Firebase:", error);
        });
    }, 200);
    setShowDeleteColorModal(false);
  };

  const handleDeletePalette = (key) => {
    if (!user?.uid) return;

    const db = getDatabase();

    const paletteToDelete = favPalettes.find((palette) => palette.key === key);
    if (!paletteToDelete || !paletteToDelete.key) return;

    const paletteRef = ref(
      db,
      `favoritePalettes/${user.uid}/${paletteToDelete.key}`,
    );

    setTimeout(() => {
      remove(paletteRef)
        .then(() => {
          console.log("Color eliminado de Firebase correctamente");

          const updatedPalettes = favPalettes.filter(
            (palette) => palette.key !== key,
          );
          setFavPalettes(updatedPalettes);
        })
        .catch((error) => {
          console.error("Error al eliminar la paleta de Firebase:", error);
        });
    }, 200);
    setShowDeletePaletteModal(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 ">
        <Navbar />
      </div>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          onClick={toggleSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="default-sidebar"
          className={`fixed left-0 z-40 w-64 h-full transition-transform -translate-x-full md:translate-x-0   ${
            isSidebarOpen ? "translate-x-0" : ""
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">
              <li>
                <p className="flex items-center p-2 text-gray-900">
                  <LayoutDashboard />
                  <span className="ms-3">Dashboard</span>
                </p>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  onClick={handleShowLikedColors}
                >
                  <PaintBucket />
                  <span className="flex-1 ms-3 whitespace-nowrap">Colores</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  onClick={handleShowPalettes}
                >
                  <Palette />
                  <span className="flex-1 ms-3 whitespace-nowrap">Paletas</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div className=" p-4 md:ml-64">
          {showLikedColors && (
            <>
              {user && (
                <h1 className="text-2xl text-center md:text-3xl md:text-left font-bold p-4">
                  ¡Bienvenido!
                  <br />
                  {user.displayName || user.email}
                </h1>
              )}

              <div className="p-4 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favColors.map((color, index) => (
                  <CardColorFavorite
                    key={index}
                    color={color.colorHex}
                    colorName={color.colorName}
                    onDelete={() =>
                      toggleDeleteModal(color.colorHex, color.colorName)
                    }
                  />
                ))}
              </div>

              {showDeleteCorlorModal && (
                <DeleteColorModal
                  onCloseButton={toggleDeleteModal}
                  onDelete={() => handleDeleteColor(colorHex)}
                  message={colorName}
                />
              )}
            </>
          )}

          {showPalettes && (
            <>
              {user && (
                <h1 className="text-2xl text-center md:text-3xl md:text-left font-bold p-4">
                  ¡Bienvenido!
                  <br />
                  {user.displayName || user.email}
                </h1>
              )}
              <div className="p-4 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favPalettes.map((palette, index) => (
                  <CardPaletteSaved
                    key={index}
                    colors={palette.colors}
                    namePalette={palette.name}
                    description={palette.description}
                    onDelete={() => toggleDeletePaletteModal(palette)}
                    onCopy={() => copyUrl(palette.url)}
                    palette={palette}
                  />
                ))}
              </div>
            </>
          )}
          {showDeletePaletteModal && (
            <DeletePaletteModal
              onCloseButton={toggleDeletePaletteModal}
              onDelete={() => handleDeletePalette(palette.key)}
              message={palette.name}
            />
          )}
          {showToastUrl && (
            <SuccessToast message={"URL copiada al portapapeles"} />
          )}
        </div>
      </div>
      {showAlert && (
        <Alert
          message="No se pudieron cargar los datos. Intenta recargar la página."
          onClose={() => setShowAlert(false)}
          variant="error"
        />
      )}
    </>
  );
};

export default Dashboard;
