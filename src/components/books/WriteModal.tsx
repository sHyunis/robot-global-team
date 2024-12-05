import { useAddBooks } from '@/hooks/queries/useBooks';
import { BookType } from '@/types/book.types';
import BookFormModal from './BookModal';
import { v4 as uuidv4 } from 'uuid';

const WriteModal = () => {
  const addMutation = useAddBooks();
  const handleAdd = (data: BookType) => addMutation.mutate(data);
  const id = uuidv4();
  return (
    <BookFormModal
      initialData={{
        id: id,
        book_writer: '',
        book_image: '',
        book_name: '',
        book_content: '',
        book_sold: 0,
      }}
      onSubmit={handleAdd}
    />
  );
};

export default WriteModal;
