import { NextPage } from 'next';
import { Search } from '@/components/Search/Search';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 px-20 pb-20">
      <Image
        className="mb-8"
        src="/star-wars-logo_bg_black.png"
        width={200}
        height={200}
        alt="Star Wars logo"
      />
      <Search />
    </main>
  );
};

export default Home;
