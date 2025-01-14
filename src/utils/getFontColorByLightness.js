function getFontColorByLightness(color) {
  function hexToRgb(color) {
    // Eliminamos el símbolo # si existe
    color = color.replace('#', '');

    // Dividimos el string en pares de caracteres
    const bigint = parseInt(color, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }

  function getColorForText(color) {
    const { r, g, b } = hexToRgb(color);
    const luminosidad = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminosidad > 128 ? true : false;
  }
  const result = getColorForText(color);
  return result;
}

export { getFontColorByLightness };
