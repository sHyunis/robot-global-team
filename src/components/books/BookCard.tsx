import { BookType } from '@/types/book.types';
import Image from 'next/image';

type BookCardProps = {
  book: BookType;
};
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className='border border-solid border-gray-800 rounded px-4 py-2 w-full h-full flex flex-col justify-center items-center '>
      {book?.book_image ? (
        <>
          <Image
            src={book?.book_image}
            alt='책 이미지'
            width={200}
            height={200}
          />
          <p className='text-[18px] font-bold mt-2'>{book?.book_name}</p>
          <p>{book?.book_writer}</p>
          <p>판매수량 : {book?.book_sold}</p>
        </>
      ) : (
        <p className='w-[200px] h-[200px]'>No Image</p>
      )}
    </div>
  );
};

export default BookCard;
