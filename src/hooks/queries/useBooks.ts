'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { addBooks, deleteBooks, getBooks, getBooksPagenation, updateBooks } from '@/lib/book';
import { BookType } from '@/types/book.types';
import Swal from 'sweetalert2';

export const useGetBooks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.books(),
    queryFn: getBooks,
  });
};

export const useGetPagenationBooks = (currentPage: number, itemsPerPage: number) => {
  return useQuery({
    queryKey: ['books', currentPage, itemsPerPage],
    queryFn: async () => {
      const { data, totalCount } = await getBooksPagenation({
        pageParam: currentPage - 1,
        ROW: itemsPerPage,
      });
      return { data, totalCount };
    },
  });
};

export const useAddBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookData: BookType) => addBooks(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books() });
      Swal.fire({
        icon: 'success',
        text: '새 게시물이 성공적으로 등록되었습니다.',
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        text: '게시물 등록에 실패했습니다.',
      });
    },
  });
};

export const useDeleteBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: string) => {
      const result = await Swal.fire({
        title: '정말로 삭제하시겠습니까?',
        text: '이 작업은 되돌릴 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      });

      if (result.isConfirmed) {
        await deleteBooks(bookId);
      } else {
        throw new Error('삭제 취소됨');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books() });
      Swal.fire({
        icon: 'success',
        text: '게시물이 삭제되었습니다.',
      });
    },
    onError: (error: Error) => {
      if (error.message !== '삭제 취소됨') {
        Swal.fire({
          icon: 'error',
          text: '게시물 삭제에 실패했습니다.',
        });
      }
    },
  });
};

export const useUpdateBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookData, id }: { bookData: BookType; id: string }) => updateBooks(bookData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books() });
      Swal.fire({
        icon: 'success',
        text: '게시물이 수정이 완료되었습니다.',
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        text: '게시물 수정에 실패했습니다.',
      });
    },
  });
};
