export const Footer = ({ generateNewPalette }) => {
  return (
    <footer className='bg-white text-black p-2 sm:p-4 flex justify-around items-center'>
      <button
        className=' bg-white border-2 border-gray-300 text-black font-semibold py-2 px-2 rounded-md'
        onClick={generateNewPalette}
      >
        Generate
      </button>
      <p className='text-sm sm:text-base text-center'>
        Hecho con ❤️ por{' '}
        <a
          href='https://github.com/retrovertigo1981'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sebastián Peña
        </a>
      </p>
    </footer>
  );
};
