import { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { useAuth } from "../hooks/useAuth";
import { ColorSavePalette } from "./ColorSavePalette";
import { ButtonSpinner } from "./ButtonSpinner";
import { X } from "lucide-react";

const SavePalette = ({ onSave, colors, onClose, fullUrl }) => {
  const [namePalette, setNamePalette] = useState("");
  const [descriptionPalette, setDescriptionPalette] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleChangeName = (e) => {
    setNamePalette(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescriptionPalette(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newPalette = {
      name: namePalette,
      description: descriptionPalette,
      colors: colors,
      url: fullUrl,
    };

    const db = getDatabase();
    const favoritePalettesRef = ref(db, `favoritePalettes/${user.uid}`);

    try {
      const newPaletteRef = push(favoritePalettesRef);
      await set(newPaletteRef, newPalette);
      console.log("Paleta guardada en Firebase correctamente");
      setIsSubmitting(false);
      onClose();
      onSave();
    } catch (error) {
      console.error("Error al guardar el color en Firebase:", error);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
        <div className="relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4  w-full max-w-md  max-h-full rounded-lg bg-white dark:bg-gray-700 shadow sm:min-w-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h1 className="text-xl text-center w-full font-semibold text-gray-900 dark:text-white">
              Guardar Paleta
            </h1>
            <button
              className="absolute right-4 top-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <X className="text-sm font-medium text-gray-900 dark:text-white" />
            </button>
          </div>
          <form className="max-w-md mx-auto p-5" onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChangeName}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />

            <label
              htmlFor="description"
              className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows="4"
              onChange={handleChangeDescription}
              className="block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            ></textarea>
            <div className="flex-1 flex flex-row h-10 mt-5 border border-transparent rounded-lg overflow-hidden">
              {colors.map((color, index) => (
                <ColorSavePalette key={index} color={color} />
              ))}
            </div>
            <button
              type="submit"
              className="text-white w-full mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {!isSubmitting ? "Guardar" : <ButtonSpinner />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { SavePalette };
