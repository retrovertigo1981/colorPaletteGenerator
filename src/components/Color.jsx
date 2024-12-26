import { useState } from 'react';
import { Copy, Lock, LockOpen, Heart, CheckCircle2 } from 'lucide-react';

export const Color = ({ color, onBlock, isBlocked, isLiked, onLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // console.log(isLiked);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className='flex-1 min-h-[20vh] sm:h-full flex flex-col justify-center items-center relative'
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className='text-white text-lg sm:text-2xl font-bold mb-2 sm:mb-4'>
        {color.toUpperCase().split('#')}
      </span>
      <div
        className={`flex space-x-2 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
      >
        <button
          onClick={copyToClipboard}
          className='p-2 sm:p-2 bg-white rounded-full'
        >
          {isCopied ? (
            <CheckCircle2 className='sm:w-5 sm:h-5 text-green-500' />
          ) : (
            <Copy size={16} className='sm:w-5 sm:h-5' />
          )}
        </button>
        <button onClick={onBlock} className='p-2 sm:p-2 bg-white rounded-full'>
          {!isBlocked ? (
            <LockOpen size={18} />
          ) : (
            <Lock size={18} color={!isBlocked ? 'black' : 'red'} />
          )}
        </button>
        <button onClick={onLike} className='p-2 sm:p-2 bg-white rounded-full'>
          <Heart
            size={16}
            className='sm:w-5 sm:h-5'
            fill={isLiked ? 'red' : 'none'}
            color={isLiked ? 'red' : 'black'}
          />
        </button>
      </div>
    </div>
  );
};
