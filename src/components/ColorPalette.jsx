import { Color } from './Color';

export const ColorPalette = ({
  colors,
  blockedColors,
  onBlockColor,
  likedColors,
  onLikeColor,
}) => {
  return (
    <div className='flex-1 flex flex-col sm:flex-row'>
      {colors.map((color, index) => (
        <Color
          key={index}
          color={color}
          onBlock={() => onBlockColor(index)}
          isBlocked={blockedColors[index]}
          isLiked={likedColors.includes(color)} // Pasar si el color está "liked"
          onLike={() => onLikeColor(color)} // Pasar la función para alternar "like"
        />
      ))}
    </div>
  );
};
