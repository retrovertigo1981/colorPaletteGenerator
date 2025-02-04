import chroma from 'chroma-js';

function generatePalette(baseColor) {
  // Generar color aleatorio en HCL con parámetros controlados
  const generateRandomColor = () => {
    return chroma
      .hcl(
        Math.random() * 360,       // Hue
        40 + Math.random() * 40,   // Croma (saturación controlada)
        50 + Math.random() * 30    // Luminosidad balanceada
      )
      .hex();
  };

  // Validar y normalizar color base
  if (!baseColor || !chroma.valid(baseColor)) {
    baseColor = generateRandomColor();
  }

  // Convertir a HCL para mejor manipulación perceptual
  let [h, c, l] = chroma(baseColor).hcl();

  // Ajustar parámetros base para mejor equilibrio
  c = Math.min(Math.max(c, 30), 70);
  l = Math.min(Math.max(l, 30), 70);
  baseColor = chroma.hcl(h, c, l).hex();

  // Función para generar variaciones armónicas
  const generateVariation = (hueShift, cMult = 1, lMult = 1) => {
    return chroma
      .hcl(
        (h + hueShift) % 360,
        Math.min(c * cMult, 80),
        Math.min(l * lMult, 80)
      )
      .hex();
  };

  // Generar colores análogos con variación luminosa
  const analogous = [
    generateVariation(30, 0.9, 1.1),  // Más claro
    generateVariation(-30, 0.9, 0.9)  // Más oscuro
  ];

  // Complementario con ajuste perceptual
  const complementary = generateVariation(180, 1.1, 0.8);

  // Versión más clara (tinte)
  const tint = generateVariation(0, 0.6, 1.4);

  // Versión más oscura (sombra)
  const shade = generateVariation(0, 0.6, 0.6);

  // Construir paleta balanceada
  const palette = [
    baseColor,
    ...analogous,
    complementary,
    tint,
    shade
  ];

  // Ajuste final para cohesión
  return palette
    .map(color => {
      const [h, c, l] = chroma(color).hcl();
      return chroma
        .hcl(
          h,
          Math.min(Math.max(c, 25), 75),  // Saturación controlada
          Math.min(Math.max(l, 20), 80)   // Luminosidad balanceada
        )
        .hex();
    })
    .slice(0, 5);  // Garantizar 5 colores
}

export { generatePalette }; 