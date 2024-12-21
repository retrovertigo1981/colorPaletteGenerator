import chroma from 'chroma-js';

// Generar una paleta de colores con Chroma.js
export const generatePalette = (baseColor = null, count = 5) => {
  const colors = baseColor
    ? chroma.scale([baseColor, chroma.random()]).mode('lab').colors(count)
    : chroma
        .scale([chroma.random(), chroma.random()])
        .mode('lab')
        .colors(count);

  return colors;
};

console.log(generatePalette());
