'use client';
import { useState, useEffect } from 'react';
import Button from './Button';
import { useGetBooks } from '@/hooks/queries/useBooks';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';

type SearchBoxProps = {
  setFilteredBooks: (books: any[]) => void;
};

const SearchBox = ({ setFilteredBooks }: SearchBoxProps) => {
  const [searchContent, setSearchContent] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('title');
  const { data: BookData } = useGetBooks();

  const debouncedSearchContent = useDebounce(searchContent, 500);

  const filteredBooksForPreview =
    BookData?.filter((book) => {
      if (searchOption === 'title') {
        return book.book_name.toLowerCase().includes(debouncedSearchContent.toLowerCase());
      }
      if (searchOption === 'author') {
        return book.book_writer.toLowerCase().includes(debouncedSearchContent.toLowerCase());
      }
      return false;
    }) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchContent && BookData) {
      const filtered = BookData.filter((book) => {
        if (searchOption === 'title') {
          return book.book_name.toLowerCase().includes(searchContent.toLowerCase());
        }
        if (searchOption === 'author') {
          return book.book_writer.toLowerCase().includes(searchContent.toLowerCase());
        }
        return false;
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(BookData || []);
    }
  };

  return (
    <div className='relative'>
      <form
        onSubmit={handleSubmit}
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

      {debouncedSearchContent && (
        <div className='absolute top-[60px] left-[75px] bg-slate-200 w-[630px] p-4 z-10'>
          {filteredBooksForPreview.length > 0 ? (
            <ul>
              {filteredBooksForPreview.map((book) => (
                <Link
                  key={book.id}
                  href={`/detail/${book.id}`}
                >
                  <li className='p-2 border border-solid border-b border-l-0 border-r-0 border-t-0 border-black'>
                    <strong>{book.book_name}</strong> - {book.book_writer}
                  </li>
                </Link>
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
