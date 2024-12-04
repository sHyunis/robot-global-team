'use client';
import { useParams } from 'next/navigation';
import { useGetBooks } from '@/hooks/queries/useBooks';
import Image from 'next/image';

const DetailPage = () => {
  const { id } = useParams();
  const { data: books } = useGetBooks();

  const bookData = books?.find((book) => book.id === id);

  if (!bookData) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='flex flex-col w-[60%] mx-auto mt-4  items-center'>
      <div className='flex items-center gap-4 '>
        <h2 className='font-bold text-[35px] mb-4'>{bookData.book_name}</h2>
        <p className='text-[20px]'>{bookData.book_writer}</p>
      </div>
      <Image
        src={bookData.book_image}
        alt='bookImage'
        width={500}
        height={600}
      />
    </div>
  );
};

export default DetailPage;
