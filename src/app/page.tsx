import BookList from '@/components/books/BookList';
import WriteModal from '@/components/books/WriteModal';
import SearchBox from '@/components/ui/SearchBox';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center w-[90%] mx-auto'>
      <div className='my-[50px]'>
        <SearchBox />
      </div>
      <div className='w-full flex justify-end'>
        <WriteModal />
      </div>
      <section className='w-full'>
        <h2 className='text-[24px] font-bold mb-[16px]'>책 목록</h2>
        <BookList />
      </section>
    </div>
  );
};

export default Home;
