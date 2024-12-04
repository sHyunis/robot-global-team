'use client';
import { useGetBooks } from '@/hooks/queries/useBooks';
import BookCard from './BookCard';
import Link from 'next/link';
import { BookType } from '@/types/book.types';

type BookListProps = {
  books: BookType[] | null;
};

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { data: bookData } = useGetBooks();

  const displayBooks = books && books.length > 0 ? books : bookData;

  return (
    <div>
      <div className='grid grid-cols-5 grid-rows-2 gap-4 '>
        {displayBooks?.map((book) => (
          <Link
            href={`/detail/${book.id}`}
            key={book.id}
            className='cursor-pointer'
          >
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
