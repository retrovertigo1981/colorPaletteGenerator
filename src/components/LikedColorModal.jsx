import { useState } from "react";
import { ButtonSpinner } from "./ButtonSpinner";
import { getDatabase, ref, push, set, get } from "firebase/database";
import { useAuth } from "../hooks/useAuth";

const LikedColorModal = ({ onSave, onClick, color }) => {
  const [colorChange, setColorChange] = useState(color);
  const [colorName, setColorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleChangeColor = (event) => {
    setColorChange(event.target.value);
  };

  const handleChangeName = (event) => {
    setColorName(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const newColor = {
      colorName: colorName,
      colorHex: colorChange,
    };

    if (!user?.uid) {
      console.error("Usuario no autenticado");
      setIsSubmitting(false);
      return;
    }

    // Guardar en Firebase Realtime Database
    const db = getDatabase();
    const favoriteColorsRef = ref(db, `favoriteColors/${user.uid}`);

    try {
      // Usamos get() para obtener los datos una vez
      const snapshot = await get(favoriteColorsRef);
      const data = snapshot.val();

      let colorsArray = [];
      if (data) {
        colorsArray = Object.values(data);
        const isColorDuplicate = colorsArray.some(
          (color) => color.colorHex === newColor.colorHex,
        );

        if (isColorDuplicate) {
          console.error("El color ya existe");
          setIsSubmitting(false);
          return;
        }
      }

      // Guardar el color si no existe
      const newColorRef = push(favoriteColorsRef);
      await set(newColorRef, newColor);

      console.log("Color guardado en Firebase correctamente");
      setIsSubmitting(false);
      onSave();
      onClick();
    } catch (error) {
      console.error("Error al guardar el color en Firebase:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Main modal */}
      <div
        tabIndex="-1"
        // aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl text-center w-full font-semibold text-gray-900 dark:text-white">
                Nuevo Color
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={onClick}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="colorName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="colorName"
                    id="colorName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Mi nuevo color"
                    value={colorName}
                    onChange={handleChangeName}
                    required
                  />
                </div>
                <div className="dark:bg-gray-700">
                  <label
                    htmlFor="colorHex"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="colorHex"
                      value={colorChange.toUpperCase()}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-12  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      readOnly
                    />

                    <input
                      type="color"
                      id="colorPicker"
                      value={colorChange}
                      onChange={handleChangeColor}
                      className=" bg-gray-50 absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 border-none cursor-pointer dark:bg-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {!isSubmitting ? "Guardar" : <ButtonSpinner />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { LikedColorModal };
