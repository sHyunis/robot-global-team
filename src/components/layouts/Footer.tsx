import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='w-full h-[80px] bg-slate-700 text-white flex justify-center items-center gap-4'>
      <p> © 2024 JungSoHyun. All rights reserved.</p>
      <Link
        target='_blank'
        href={'https://github.com/sHyunis/robot-global-team'}
      >
        <Image
          src='/imgs/Github.png'
          alt='github'
          width={50}
          height={50}
        ></Image>
      </Link>
      <Link
        target='_blank'
        href={'https://velog.io/@alice0751/posts'}
      >
        <Image
          src='/imgs/velog.svg'
          alt='velog'
          width={30}
          height={30}
        ></Image>
      </Link>
    </div>
  );
};

export default Footer;
