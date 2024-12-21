import chroma from 'chroma-js';

function generatePalette(basecolor) {
  const generateRandomColor = () => chroma.random().hex();

  if (!basecolor) {
    basecolor = generateRandomColor();
  }

  const analogous = [
    chroma(basecolor).set('hsl.h', '+30').hex(),
    chroma(basecolor).set('hsl.h', '-30').hex(),
  ];

  const complementary = chroma(basecolor).set('hsl.h', '+180').hex();

  const lighter = chroma(basecolor).brighten(1.5).hex();

  const pallete = [basecolor, ...analogous, complementary, lighter];

  return pallete.slice(0, 5);
}

export { generatePalette };
