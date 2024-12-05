import { BookType } from '@/types/book.types';
import { supabase } from '@/utils/supabase/supabase';
import { v4 as uuidv4 } from 'uuid';

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
  try {
    const { error } = await supabase.from('books').insert({
      id: bookData.id,
      book_writer: bookData.book_writer,
      book_image: bookData.book_image,
      book_name: bookData.book_name,
      book_content: bookData.book_content,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('책 등록 오류:', error);
    throw error;
  }
};

export const updateBooks = async (bookData: BookType, id: string) => {
  const { error } = await supabase
    .from('books')
    .update({
      id: bookData.id,
      book_writer: bookData.book_writer,
      book_image: bookData.book_image,
      book_name: bookData.book_name,
      book_content: bookData.book_content,
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
export const deleteBooks = async (bookDataId: string) => {
  const { error } = await supabase.from('books').delete().eq('id', bookDataId);

  if (error) {
    throw new Error(error.message);
  }
};

export const getStoragePublicUrl = async (file: File) => {
  try {
    const fileName = uuidv4();
    const filePath = `bookImage/${fileName}`;

    const { data, error } = await supabase.storage.from('books').upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data: urlData } = supabase.storage.from('books').getPublicUrl(data.path);
    return urlData.publicUrl;
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    throw error;
  }
};
