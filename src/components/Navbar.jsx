export const Navbar = () => {
  return (
    <nav className='bg-white text-black border border-gray-400  p-2 sm:p-4'>
      <h1 className='text-xl sm:text-2xl font-lobster flex items-center'>
        <span className='mr-2'>
          <img src='/swatch-book.svg' alt='Colorsitos Logo' />
        </span>
        Colorsitos.app
      </h1>
    </nav>
  );
};
