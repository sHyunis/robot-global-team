import { BookType } from '@/types/book.types';
import { supabase } from '@/utils/supabase/supabase';

type BookProps = {
  pageParam: number;
  ROW: number;
};

export const getBooks = async ({ pageParam = 0, ROW }: BookProps) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .range(pageParam, pageParam + ROW - 1);

  if (error) {
    console.error(error);
  }

  if (data) return data;
};

export const addBooks = async (bookData: BookType) => {
  const { error } = await supabase.from('books').insert(bookData);

  if (error) console.error(error);
};

export const updateBooks = async (bookData: BookType) => {
  const { error } = await supabase.from('books').update(bookData).eq('id', bookData.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteBooks = async (bookDataId: string) => {
  const { error } = await supabase.from('books').delete().eq('id', bookDataId);
};
