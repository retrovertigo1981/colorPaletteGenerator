import { Color } from "./Color";

export const ColorPalette = ({
  colors,
  colorNames,
  blockedColors,
  onBlockColor,
  likedColors,
  onLikeColor,
  getFontColor,
}) => {
  return (
    <div className="flex-1 flex flex-col md:flex-row ">
      {colors.map((color, index) => (
        <Color
          key={index}
          color={color}
          colorName={colorNames[index]}
          onBlock={() => onBlockColor(index)}
          isBlocked={blockedColors[index]}
          isLiked={likedColors.includes(color)} // Pasar si el color está "liked"
          onLike={() => onLikeColor(color)} // Pasar la función para alternar "like"
          fontColor={getFontColor(color)} // Pasar la función para obtener color de texto
        />
      ))}
    </div>
  );
};
