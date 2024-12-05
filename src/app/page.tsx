'use client';
import { useState } from 'react';
import BookList from '@/components/books/BookList';
import WriteModal from '@/components/books/WriteModal';
import SearchBox from '@/components/ui/SearchBox';
import { BookType } from '@/types/book.types';
import Button from '@/components/ui/Button';
import { useDeleteBooks } from '@/hooks/queries/useBooks';

const Home = () => {
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
  const [deleteOn, setDeleteOn] = useState<boolean>(false);
  const deleteMutation = useDeleteBooks();

  const handleDelete = (bookId: string) => {
    deleteMutation.mutate(bookId);
  };

  const handleOnDeleteBook = () => {
    setDeleteOn((prev) => !prev);
  };
  return (
    <div className='min-h-screen flex flex-col justify-center items-center w-[1260px] mx-auto mb-8'>
      <div className='my-[50px]'>
        <SearchBox setFilteredBooks={setFilteredBooks} />
      </div>
      <div className='w-full flex justify-end gap-4'>
        <Button
          className='px-2 py-1 bg-slate-700 text-white rounded hover:bg-blue-800 font-bold'
          text={deleteOn === false ? '게시물 삭제' : '완료'}
          onClick={handleOnDeleteBook}
        />
        <WriteModal />
      </div>
      <section className='w-full'>
        <h2 className='text-[24px] font-bold mb-[16px]'>책 목록</h2>
        <BookList
          books={filteredBooks}
          onDelete={handleDelete}
          deleteState={deleteOn}
        />
      </section>
    </div>
  );
};

export default Home;
