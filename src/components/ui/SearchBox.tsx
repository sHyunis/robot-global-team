'use client';
import { useState, useEffect } from 'react';
import Button from './Button';
import { useGetBooks } from '@/hooks/queries/useBooks';
import { useDebounce } from '@/hooks/useDebounce';

const SearchBox = () => {
  const [searchContent, setSearchContent] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('title');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

  const { data: BookData } = useGetBooks();

  const debouncedSearchContent = useDebounce(searchContent, 500);

  useEffect(() => {
    if (debouncedSearchContent && BookData) {
      const filtered = BookData.filter((book) => {
        if (searchOption === 'title') {
          return book.book_name.toLowerCase().includes(debouncedSearchContent.toLowerCase());
        }
        if (searchOption === 'author') {
          return book.author_name.toLowerCase().includes(debouncedSearchContent.toLowerCase());
        }
        return false;
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [debouncedSearchContent, searchOption, BookData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  return (
    <div className='relative'>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-[800px] h-[60px] border-2 border-solid border-slate-700 rounded-[12px] flex items-center overflow-hidden '
      >
        <select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
          className='h-full pl-[16px] text-[20px] font-medium border-r-2 border-solid border-slate-700 outline-none'
        >
          <option value='title'>제목</option>
          <option value='author'>작가</option>
        </select>
        <input
          type='text'
          placeholder='책을 검색해주세요'
          className='w-[700px] h-full pl-[16px] text-[20px] outline-none'
          value={searchContent}
          onChange={handleSearchChange}
        />
        <Button
          className='bg-slate-700 w-[100px] h-full text-white font-bold flex justify-center items-center cursor-pointer text-[20px]'
          text='검색'
        />
      </form>

      {searchContent && (
        <div className='absolute top-[60px] left-[75px] bg-slate-200 w-[630px] p-4 z-10'>
          {filteredBooks.length > 0 ? (
            <ul>
              {filteredBooks.map((book) => (
                <li
                  key={book.id}
                  className='p-2 border border-solid border-b border-l-0 border-r-0 border-t-0 border-black'
                >
                  <strong>{book.book_name}</strong> - {book.book_writer}
                </li>
              ))}
            </ul>
          ) : (
            <div>검색된 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
