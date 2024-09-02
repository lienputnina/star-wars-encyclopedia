import { NextPage } from 'next';
import { Search } from '@/components/Search';

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <Search />
    </main>
  );
};

export default Home;
