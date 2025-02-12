import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Navbar } from "../components/Navbar";
import { CardColorFavorite } from "../components/CardColorFavorite";
import { LayoutDashboard, PaintBucket, Palette } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [favColors, setFavColors] = useState([]);
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLikedColors, setShowLikedColors] = useState(true);
  const [showPalettes, setShowPalettes] = useState(false);

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

  useEffect(() => {
    if (user?.uid) {
      const db = getDatabase();
      const favoriteColorsRef = ref(db, `favoriteColors/${user.uid}`);

      onValue(favoriteColorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const colorsArray = Object.entries(data).map(([key, color]) => ({
            ...color,
            key, // Agregar la clave única al objeto del color
          }));
          setFavColors(colorsArray);
        } else {
          setFavColors([]);
        }
      });
    }
  }, [user]);

  const handleDeleteColor = (hex) => {
    if (!user?.uid) return;

    const db = getDatabase();

    // 1. Encontrar el color en el estado local para obtener su clave única (key)
    const colorToDelete = favColors.find((color) => color.colorHex === hex);
    if (!colorToDelete || !colorToDelete.key) return; // Si no se encuentra el color, salir

    // 2. Eliminar el color de Firebase
    const colorRef = ref(db, `favoriteColors/${user.uid}/${colorToDelete.key}`);
    remove(colorRef)
      .then(() => {
        console.log("Color eliminado de Firebase correctamente");

        // 3. Actualizar el estado local
        const updatedColors = favColors.filter(
          (color) => color.colorHex !== hex,
        );
        setFavColors(updatedColors);
      })
      .catch((error) => {
        console.error("Error al eliminar el color de Firebase:", error);
      });
  };

  return (
    <>
      <Navbar />
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

        <div className="p-4 md:ml-64">
          {showLikedColors && (
            <>
              {user && (
                <h1 className="text-2xl text-center md:text-3xl md:text-left font-bold p-4">
                  ¡Bienvenido!
                  <br />
                  {user.displayName || user.email}
                </h1>
              )}

              {/* Grid de tarjetas de colores */}
              <div className="p-4 flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favColors.map((color, index) => (
                  <CardColorFavorite
                    key={index}
                    color={color.colorHex}
                    colorName={color.colorName}
                    onDelete={() => handleDeleteColor(color.colorHex)}
                  />
                ))}
              </div>
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

              <p>Hola</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
