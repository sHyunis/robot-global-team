'use client';
import { useGetBooks } from '@/hooks/queries/useBooks';

const BookList = () => {
  const { data: bookData } = useGetBooks();

  return <div>{}</div>;
};

export default BookList;
