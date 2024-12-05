'use client';
import { useState } from 'react';
import BookList from '@/components/books/BookList';
import WriteModal from '@/components/books/WriteModal';
import SearchBox from '@/components/ui/SearchBox';
import { BookType } from '@/types/book.types';

const Home = () => {
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);

  return (
    <div className='flex flex-col justify-center items-center w-[1600px] mx-auto'>
      <div className='my-[50px]'>
        <SearchBox setFilteredBooks={setFilteredBooks} />
      </div>
      <div className='w-full flex justify-end gap-4'>
        <WriteModal />
      </div>
      <section className='w-full'>
        <h2 className='text-[24px] font-bold mb-[16px]'>책 목록</h2>
        <BookList books={filteredBooks} />
      </section>
    </div>
  );
};

export default Home;
