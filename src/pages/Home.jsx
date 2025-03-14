import { Navbar } from "../components/layout/Navbar";
import { Button } from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/generate");
  };

  return (
    <>
      <style>
        {`
          @keyframes floatAround1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(10%, 10%) scale(1.1); }
            50% { transform: translate(-5%, 15%) scale(0.95); }
            75% { transform: translate(-15%, -10%) scale(1.05); }
          }
          @keyframes floatAround2 {
            0%, 100% { transform: translate(0, 0) scale(1.1); }
            25% { transform: translate(-15%, 5%) scale(1); }
            50% { transform: translate(10%, -10%) scale(1.05); }
            75% { transform: translate(15%, 15%) scale(0.95); }
          }
          .float-1 {
            animation: floatAround1 20s infinite ease-in-out;
          }
          .float-2 {
            animation: floatAround2 25s infinite ease-in-out;
          }
        `}
      </style>

      <Navbar />
      {/* Fondo animado */}
      <div className="fixed inset-0 overflow-hidden -z-30">
        {/* Capa de overlay para mejorar el contraste */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-xl"></div>

        {/* Burbujas de color animadas */}
        <div className="absolute inset-0">
          {/* Burbujas con menos desenfoque y más intensidad */}
          <div className="absolute -top-1/4 -left-1/4 w-[150vh] h-[150vh] rounded-full bg-[#2f8edc] float-1 mix-blend-soft-light blur-2xl opacity-90 md:w-[100vw] md:h-[100vw]"></div>
          <div className="absolute top-1/2 -right-1/4 w-[120vh] h-[120vh] rounded-full bg-[#f20de0] float-2 mix-blend-soft-light blur-2xl opacity-80 md:w-[90vw] md:h-[90vw]"></div>
          <div className="absolute -bottom-1/4 left-1/4 w-[130vh] h-[130vh] rounded-full bg-[#6851d2] float-1 mix-blend-soft-light blur-2xl opacity-85 md:w-[95vw] md:h-[95vw]"></div>
          <div className="absolute top-0 right-1/3 w-[140vh] h-[140vh] rounded-full bg-[#f2e011] float-2 mix-blend-soft-light blur-2xl opacity-75 md:w-[85vw] md:h-[85vw]"></div>
          <div className="absolute bottom-0 left-1/3 w-[125vh] h-[125vh] rounded-full bg-[#7af8ed] float-1 mix-blend-soft-light blur-2xl opacity-80 md:w-[88vw] md:h-[88vw]"></div>
        </div>
      </div>

      {/* Contenido principal con mejor contraste */}
      <div className="grid place-content-center h-full fixed inset-0 -z-20">
        <div className="grid place-items-center px-4 md:px-8">
          <h1 className="text-center font-extrabold text-4xl md:text-6xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Bienvenidos a Colorsitos.app
          </h1>
          <h2 className="text-center text-1xl md:text-2xl mt-5 font-semibold mb-12 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            La app generadora de paletas de colores mas hermosas de la web
          </h2>

          <Button
            text={"Generar Paletas"}
            className="w-60 shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
