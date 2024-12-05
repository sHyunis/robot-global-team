'use client';

const CARDSTYLE = 'w-full h-[400px] rounded px-4 py-2 flex flex-col justify-center items-center bg-gray-200';
const CARDCOUNT = 10;
const HomeLoading = () => {
  return (
    <div className='grid grid-cols-5 grid-rows-2 gap-4'>
      {Array.from({ length: CARDCOUNT }).map((_, index) => (
        <div
          key={index}
          className={`${CARDSTYLE}`}
        />
      ))}
    </div>
  );
};

export default HomeLoading;
