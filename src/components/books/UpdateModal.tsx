import { useUpdateBooks } from '@/hooks/queries/useBooks';
import { BookType } from '@/types/book.types';
import BookFormModal from './BookModal';

const UpdateModal = ({ bookData }: { bookData: BookType }) => {
  const updateMutation = useUpdateBooks();
  const handleUpdate = (data: BookType) => updateMutation.mutate({ bookData: data, id: bookData.id });

  return (
    <BookFormModal
      initialData={bookData}
      onSubmit={handleUpdate}
      isUpdate
    />
  );
};

export default UpdateModal;
