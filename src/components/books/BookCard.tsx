import { BookType } from '@/types/book.types';
import Image from 'next/image';

type BookCardProps = {
  book: BookType;
};
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className='border border-solid border-gray-800 rounded px-4 py-2 w-[300px] h-[400px] flex flex-col justify-center items-center gap-4'>
      {book?.book_image ? (
        <>
          <Image
            src={book?.book_image}
            alt='책 이미지'
            width={200}
            height={200}
          />
          <p>
            {book?.book_name}-{book?.book_writer}
          </p>
        </>
      ) : (
        <p className='w-[200px] h-[200px]'>No Image</p>
      )}
    </div>
  );
};

export default BookCard;
