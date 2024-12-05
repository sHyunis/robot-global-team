import { useState } from 'react';
import { BookType } from '@/types/book.types';
import BookCard from './BookCard';
import Link from 'next/link';
import Button from '../ui/Button';
import { useGetPagenationBooks } from '@/hooks/queries/useBooks';
import HomeLoading from '../loading/HomeLoading';
import Image from 'next/image';

type BookListProps = {
  books: BookType[] | null;
  onDelete: (bookId: string) => void;
  deleteState: boolean;
};

const ITEMSPERPAGE = 10;

const BookList: React.FC<BookListProps> = ({ books, onDelete, deleteState }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: bookData, isLoading } = useGetPagenationBooks(currentPage, ITEMSPERPAGE);

  const isSearching = books && books.length > 0;
  const totalBooks = isSearching ? books.length : bookData?.totalCount || 0;
  const totalPages = Math.ceil(totalBooks / ITEMSPERPAGE);

  const startIndex = (currentPage - 1) * ITEMSPERPAGE;
  const displayBooks = isSearching ? books.slice(startIndex, startIndex + ITEMSPERPAGE) : bookData?.data;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <HomeLoading />;
  if (totalBooks === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <div>
      <div className='grid grid-cols-5 grid-rows-2 gap-4'>
        {displayBooks?.map((book) => (
          <div
            key={book.id}
            className='cursor-pointer relative'
          >
            {deleteState === true && (
              <Image
                src={'/icon/closeIcon.svg'}
                alt='닫기'
                width={25}
                height={25}
                className='absolute right-2 top-2 bg-slate-700 rounded text-white z-20'
                onClick={() => onDelete(book.id)}
              />
            )}

            <Link href={`/detail/${book.id}`}>
              <BookCard book={book} />
            </Link>
          </div>
        ))}
      </div>

      <div className='relative w-[200px] mt-12 mx-auto'>
        {currentPage > 1 && (
          <Button
            className='absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-300 rounded cursor-pointer'
            text='이전'
            onClick={() => handlePageChange(currentPage - 1)}
          />
        )}

        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          {currentPage} / {totalPages}
        </span>

        {currentPage < totalPages && (
          <Button
            className='absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-300 rounded cursor-pointer'
            text='다음'
            onClick={() => handlePageChange(currentPage + 1)}
          />
        )}
      </div>
    </div>
  );
};

export default BookList;
