import { NextPage } from 'next';
import ErrorPage from '@/components/ErrorPage';
import { CharacterDetails } from '@/components/CharacterDetails';
import { getCharacterData } from '@/server/getCharacterData';
import { CharacterNotFound } from '@/components/CharacterNotFound';

interface CharacterPage {
  params: {
    id: string;
  };
}

const CharacterPage = async ({ params }: CharacterPage) => {
  const { id } = params;

  try {
    const character = await getCharacterData(id);

    if (!character) {
      return <CharacterNotFound />;
    }

    return (
      <div className="p-10">
        <h1 className="text-center my-4 text-xl">{character.name}</h1>
        <CharacterDetails character={character} />
      </div>
    );
  } catch (error: any) {
    console.error(error.message);
    return <ErrorPage message={error.message} />;
  }
};

export default CharacterPage;
