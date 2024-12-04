'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { addBooks, deleteBooks, getBooks, updateBooks } from '@/lib/book';
import { BookType } from '@/types/book.types';

const ROW = 10;

export const useGetBooks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.books(),
    queryFn: async ({ pageParam }) => getBooks({ pageParam: pageParam as number, ROW }),
  });
};

export const useAddBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookData: BookType) => addBooks(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books() });
    },
  });
};

export const useDeleteBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => deleteBooks(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books() });
    },
  });
};

export const useUpdateBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookData: BookType) => updateBooks(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books() });
    },
  });
};
