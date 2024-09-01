import { gql } from '@apollo/client';
import { getClient } from '@/server/apollo-client';
import { NextPage } from 'next';
import ErrorPage from '@/components/ErrorPage';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    person(id: $id) {
      id
      name
      birthYear
      species {
        name
      }
      homeworld {
        name
        climates
        gravity
        terrains
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;

interface Character {
  person: {
    name: string;
    birthYear: string;
    species: { name: string | null };
    homeworld: {
      name: string;
      climates: string;
      gravity: string;
      terrains: string[];
    };

    filmConnection: {
      films: [{ title: string }];
    };
  };
  id: string;
}

const CharacterNotFound: NextPage = () => (
  <div className="p-10">
    <h1>Character Not Found</h1>
    <p>Looks like this character is not in the database.</p>
  </div>
);

export const CharacterPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const client = getClient();

  let character = null;
  let error = null;

  try {
    const { data: characterData } = await client.query<Character>({
      query: GET_CHARACTER,
      variables: { id: decodeURIComponent(id) },
    });

    if (characterData?.person) {
      character = characterData.person;
    } else {
      console.error('Character data is missing');
    }
  } catch (error: any) {
    if (error.networkError) {
      error =
        'Network error: Unable to reach the server. Please check your internet connection and try again.';
    } else if (error.graphQLErrors?.length > 0) {
      error =
        'Error fetching data: The requested character data could not be retrieved. Please try again later.';
    } else {
      error =
        'Unexpected error: Something went wrong while fetching the character data. Please refresh the page or try again later.';
    }
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!character) {
    return <CharacterNotFound />;
  }

  return (
    <main className="character-page p-10">
      <div className="star-wars-character pt-8">
        <h1>{character.name}</h1>
        <p className=" p-0.5">Birth Year: {character.birthYear}</p>
        <p className=" p-0.5">
          Species: {character.species?.name || 'unknown'}
        </p>
        <div className="homeworld flex-col">
          <p className="p-0.5 justify-self-start">
            Homeworld:{' '}
            {`${character.homeworld.name}, ${character.homeworld.climates}, ${character.homeworld.gravity} gravity, ${character.homeworld.terrains.join(', ')}`}
          </p>
        </div>
        <p className=" p-0.5">
          Films:{' '}
          {character.filmConnection.films?.map((film) => film.title).join(', ')}
        </p>
      </div>
    </main>
  );
};

export default CharacterPage;
