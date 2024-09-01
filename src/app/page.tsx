import { NextPage } from 'next';
import { Characters } from '../components/Characters';

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <Characters />
    </main>
  );
};

export default Home;
