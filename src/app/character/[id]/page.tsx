import { gql } from '@apollo/client';
import { serverClient } from '@/server/apollo-client';

import ErrorPage from '@/components/ErrorPage';
import { CharacterNotFound } from '@/components/CharacterNotFound';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    person(id: $id) {
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

export interface Character {
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

const CharacterPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  let character = null;
  let error = null;

  try {
    const { data: characterData } = await serverClient.query<Character>({
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
    <div className="p-10">
      <h1 className="text-lg text-center mb-4">{character.name}</h1>
      <p className=" p-0.5">Birth Year: {character.birthYear}</p>
      <p className=" p-0.5">Species: {character.species?.name || 'unknown'}</p>
      <div className="homeworld flex-col">
        <p className="p-0.5 justify-self-start">
          Homeworld:{' '}
          {`${character.homeworld?.name}, ${character.homeworld?.climates || 'unknown'} climate, ${character.homeworld?.gravity || 'unknown'} gravity, ${character.homeworld?.terrains?.join(', ') || 'unknown'} terrain`}
        </p>
      </div>
      <p className=" p-0.5">
        Films:{' '}
        {character.filmConnection?.films.map((film) => film.title).join(', ')}
      </p>
    </div>
  );
};

export default CharacterPage;
