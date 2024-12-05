import Link from 'next/link';

const Header = () => {
  return (
    <header className='w-full h-[80px] bg-slate-700 flex justify-center items-center'>
      <Link href={'/'}>
        <h1 className='text-white text-3xl font-bold'>BOOKSTORE</h1>
      </Link>
    </header>
  );
};

export default Header;
