import { NextPage } from 'next';
import { Characters } from '../components/Characters';
import { Search } from '@/components/Search';

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <Search placeholder="Search characters" />
      <Characters />
    </main>
  );
};

export default Home;
