import chroma from 'chroma-js';

function generatePalette(basecolor) {
  // Función para generar color aleatorio
  const generateRandomColor = () => chroma.random().hex();

  // Validación y asignación del color base
  if (!basecolor || !chroma.valid(basecolor)) {
    basecolor = generateRandomColor();
  }

  // Función para ajustar la saturación dentro de límites razonables
  const adjustSaturation = (color) => {
    const s = chroma(color).get('hsl.s');
    if (s > 0.9) return chroma(color).set('hsl.s', 0.9);
    if (s < 0.2) return chroma(color).set('hsl.s', 0.2);
    return chroma(color);
  };

  // Generar colores análogos con mayor separación y ajuste de saturación
  const analogous = [
    adjustSaturation(chroma(basecolor).set('hsl.h', '+30')).hex(),
    adjustSaturation(chroma(basecolor).set('hsl.h', '-30')).hex(),
  ];

  // Generar complementario con ajustes de saturación y luminosidad
  const complementary = chroma(basecolor)
    .set('hsl.h', '+180')
    .saturate(0.1)
    .hex();

  // Versión más clara con ajustes más sutiles
  const lighter = chroma(basecolor).brighten(0.7).desaturate(0.1).hex();

  // Combinar y retornar la paleta
  const palette = [basecolor, ...analogous, complementary, lighter];

  // Asegurar que todos los colores tengan saturación adecuada
  const adjustedPalette = palette.map((color) =>
    adjustSaturation(chroma(color)).hex()
  );

  return adjustedPalette.slice(0, 5);
}

export { generatePalette };
