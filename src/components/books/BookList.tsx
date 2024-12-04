'use client';
import { useGetBooks } from '@/hooks/queries/useBooks';

const BookList = () => {
  const bookData = useGetBooks();
  console.log(bookData);
  return <div>BookList</div>;
};

export default BookList;
