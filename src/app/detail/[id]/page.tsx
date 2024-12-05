'use client';
import { useParams } from 'next/navigation';
import { useGetBooks } from '@/hooks/queries/useBooks';
import Image from 'next/image';
import UpdateModal from '@/components/books/UpdateModal';

const DetailPage = () => {
  const { id } = useParams();
  const { data: books } = useGetBooks();

  const bookData = books?.find((book) => book.id === id);

  if (!bookData) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }

  const POSTLIST = [
    { title: '제목', content: bookData.book_name },
    { title: '작가', content: bookData.book_writer },
    { title: '판매수량', content: bookData.book_sold },
    { title: '줄거리', content: bookData.book_content },
  ];

  return (
    <div className='min-h-screen flex-col  justify-center items-center w-[1400px] mx-auto pt-16 relative '>
      <div className='absolute right-0'>
        <UpdateModal bookData={bookData} />
      </div>
      <div className='flex items-center gap-4 mb-16 '>
        <h2 className='font-bold text-[35px] '>{bookData.book_name}</h2>
        <p className='text-[20px]'>{bookData.book_writer}</p>
      </div>
      <div className='flex justify-between gap-12'>
        <div className='w-[500px] h-[600px] relative'>
          <Image
            src={bookData.book_image}
            alt='bookImage'
            fill
            className='object-cover absolute'
          />
        </div>
        <div className='w-full h-[600px] flex flex-col bg-slate-200 p-8 gap-4'>
          {POSTLIST.map((post, index) => (
            <div
              key={index}
              className='flex gap-4 text-[20px]'
            >
              <p className='w-[100px] font-bold'>{post.title}</p>
              <p className='w-full whitespace-break-spaces'>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
