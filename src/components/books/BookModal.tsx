import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { BookType } from '@/types/book.types';
import { getStoragePublicUrl } from '@/lib/book';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Image from 'next/image';

type BookFormModalProps = {
  initialData: BookType;
  onSubmit: (data: BookType) => void;
  isUpdate?: boolean;
};

const BookFormModal: React.FC<BookFormModalProps> = ({ initialData, onSubmit, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<BookType>(initialData);
  const [previewImage, setPreviewImage] = useState<string>(initialData.book_image);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const publicUrl = await getStoragePublicUrl(file);
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, book_image: publicUrl }));
    }
  };
  const INPUTMENUS = [
    {
      label: '판매수량',
      type: 'number',
      name: 'book_sold',
      value: formData.book_sold,
      maxLength: 8,
    },
    {
      label: '제목',
      type: 'text',
      name: 'book_name',
      value: formData.book_name,
      maxLength: 15,
    },
    {
      label: '작가',
      type: 'text',
      name: 'book_writer',
      value: formData.book_writer,
      maxLength: 15,
    },
  ] as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'book_sold' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    handleCloseModal();
  };

  return (
    <div>
      <Button
        onClick={handleOpenModal}
        className='px-4 py-2 bg-slate-700 text-white rounded hover:bg-blue-800 font-bold'
        text={isUpdate ? '게시물 수정' : '게시물 작성'}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h2 className='text-[27px] font-bold mb-4 text-center'>{isUpdate ? '게시물 수정' : '게시물 작성'}</h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2 flex items-center gap-3 text-[20px]'>
            이미지
            <Input
              type='file'
              name='book_image'
              className='flex-1 border rounded px-2 py-1 mt-1 cursor-pointer'
              onChange={handleFileChange}
              required={!isUpdate}
            />
          </label>
          {previewImage && (
            <div className='mb-2'>
              <p>현재 이미지:</p>
              <Image
                src={previewImage}
                alt='book preview'
                width={120}
                height={120}
                className=' border rounded'
              />
            </div>
          )}
          {INPUTMENUS.map((menu, index) => (
            <label
              className='block mb-2 text-[20px]'
              key={index}
            >
              {menu.label}
              <Input
                className='w-full border rounded px-2 py-1 mt-1'
                type={menu.type}
                name={menu.name}
                onChange={handleChange}
                value={menu.value}
                maxLength={menu.maxLength}
              />
            </label>
          ))}
          <label className='block mb-2 text-[20px]'>
            내용 (600자 이하)
            <textarea
              name='book_content'
              className='w-full border rounded px-2 py-1 mt-1'
              rows={12}
              value={formData.book_content}
              onChange={handleChange}
              maxLength={600}
              required
            ></textarea>
          </label>
          <div className='flex justify-end mt-4'>
            <Button
              type='button'
              onClick={handleCloseModal}
              className='px-4 py-2 bg-gray-300 rounded mr-2'
              text='취소'
            />
            <Button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
              text={isUpdate ? '수정' : '등록'}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookFormModal;
