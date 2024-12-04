'use client';
import { useGetBooks } from '@/hooks/queries/useBooks';
import BookCard from './BookCard';

const BookList = () => {
  const { data: bookData } = useGetBooks();

  return (
    <div>
      {bookData ? (
        <div className='grid grid-cols-5 grid-rows-2 gap-4 '>
          {bookData?.map((book) => (
            <BookCard
              book={book}
              key={book.id}
            />
          ))}
        </div>
      ) : (
        <div>등록된 책이 없습니다.</div>
      )}
    </div>
  );
};

export default BookList;
