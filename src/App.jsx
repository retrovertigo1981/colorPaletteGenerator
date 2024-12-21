import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ColorPalette } from './components/ColorPalette';
import { Footer } from './components/Footer';
import { generatePalette } from './utils/generatePalette';

const App = () => {
  const [colors, setColors] = useState(new Array(5).fill('')); // Paleta generada
  const [blockedColors, setBlockedColors] = useState(new Array(5).fill(false)); // Estados de bloqueo

  // Función para generar una nueva paleta respetando los colores bloqueados
  const generateNewPalette = useCallback(() => {
    const newPalette = colors.map((color, index) => {
      return blockedColors[index] ? color : generatePalette()[index];
    });
    setColors(newPalette);
  }, [colors, blockedColors]);

  // Generar la paleta inicial al cargar la aplicación
  useEffect(() => {
    generateNewPalette(); // Genera la paleta inicial
  }, []); // Ahora agregamos `generateNewPalette` como dependencia

  // Escuchar la barra espaciadora para cambiar la paleta
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Evitar el desplazamiento de página
        generateNewPalette();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [generateNewPalette]);

  // Manejar el bloqueo/desbloqueo de un color
  const handleBlockColor = (index) => {
    const updatedBlockedColors = [...blockedColors];
    updatedBlockedColors[index] = !blockedColors[index]; // Alternar el bloqueo
    setBlockedColors(updatedBlockedColors);
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <ColorPalette
        colors={colors} // Paleta actual
        blockedColors={blockedColors} // Estados de bloqueo
        onBlockColor={handleBlockColor} // Función para bloquear/desbloquear colores
      />
      <Footer />
    </div>
  );
};

export default App;
