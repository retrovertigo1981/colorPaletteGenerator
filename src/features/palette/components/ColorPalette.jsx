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
    <div className="flex-1 flex flex-col md:flex-row z-30">
      {colors.map((color, index) => (
        <Color
          key={index}
          color={color}
          colorName={colorNames[index]}
          onBlock={() => onBlockColor(index)}
          isBlocked={blockedColors[index]}
          isLiked={likedColors.includes(color)}
          onLike={() => onLikeColor(color)}
          fontColor={getFontColor(color)}
        />
      ))}
    </div>
  );
};
