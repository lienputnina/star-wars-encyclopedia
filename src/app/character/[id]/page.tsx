import { NextPage } from 'next';
import ErrorPage from '@/components/ErrorPage';
import { CharacterDetails } from '@/components/CharacterDetails';
import { getCharacterData } from '@/server/getCharacterData';

interface CharacterPage {
  params: {
    id: string;
  };
}

const CharacterNotFound: NextPage = () => (
  <div className="p-10">
    <h1>Character Not Found</h1>
    <p>Looks like this character is not in the database.</p>
  </div>
);

const CharacterPage = async ({ params }: CharacterPage) => {
  const { id } = params;

  try {
    const character = await getCharacterData(id);

    if (!character) {
      return <CharacterNotFound />;
    }

    return <CharacterDetails character={character} id={character.id} />;
  } catch (error: any) {
    console.error(error.message);
    return <ErrorPage message={error.message} />;
  }
};

export default CharacterPage;
