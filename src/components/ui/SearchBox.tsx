'use client';
import { useState } from 'react';
import Button from './Button';

const SearchBox = () => {
  const [searchContent, setSearchContent] = useState<string>('');
  const handleClick = () => {
    alert('검색이 완료되었습니다');
  };

  return (
    <div className='w-[800px] h-[60px] border-2 border-solid border-slate-400 rounded-[12px] flex items-center overflow-hidden'>
      <input
        type='text'
        placeholder='책을 검색해주세요'
        className='w-[700px] h-full pl-[16px] text-[20px] outline-none'
      />
      <Button
        className='bg-slate-400 w-[100px] h-full text-white font-bold flex justify-center items-center text-[20px]'
        text='검색'
        onClick={handleClick}
      />
    </div>
  );
};

export default SearchBox;
