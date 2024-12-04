'use client';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useAddBooks } from '@/hooks/queries/useBooks';
import { v4 as uuidv4 } from 'uuid';
import { BookType } from '@/types/book.types';

const WriteModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [writeData, setWriteData] = useState<BookType>({
    id: '',
    book_image: '',
    book_name: '',
    book_content: '',
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const addMutation = useAddBooks();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWriteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = uuidv4();
    const dataWithId = { ...writeData, id };
    addMutation.mutate(dataWithId);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-bold'
      >
        게시물 작성
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h2 className='text-xl font-bold mb-4'>게시물 작성</h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2 flex items-center gap-3'>
            이미지
            <input
              type='file'
              name='book_image'
              className='flex-1 border rounded px-2 py-1 mt-1 cursor-pointer'
              onChange={handleChange}
              required
            />
          </label>
          <label className='block mb-2'>
            제목
            <input
              type='text'
              name='book_name'
              className='w-full border rounded px-2 py-1 mt-1'
              value={writeData.book_name}
              onChange={handleChange}
              required
            />
          </label>
          <label className='block mb-2'>
            내용
            <textarea
              name='book_content'
              className='w-full border rounded px-2 py-1 mt-1'
              rows={4}
              value={writeData.book_content}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <div className='flex justify-end mt-4'>
            <button
              type='button'
              onClick={handleCloseModal}
              className='px-4 py-2 bg-gray-300 rounded mr-2'
            >
              취소
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
            >
              등록
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WriteModal;