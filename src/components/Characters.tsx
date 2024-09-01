import { gql } from '@apollo/client';
import { FC } from 'react';
import Link from 'next/link';
import { getClient } from '@/server/apollo-client';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    allPeople {
      people {
        id
        name
        birthYear
        species {
          name
        }
        homeworld {
          name
        }
        filmConnection {
          films {
            title
          }
        }
      }
    }
  }
`;

export interface Characters {
  allPeople: { people: [] };
  id: string;
  name: string;
  birthYear: string;
  species: { name: string };
  homeworld: { name: string };
  filmConnection: {
    films: [{ title: string }];
  };
}

export const Characters: FC = async () => {
  const client = getClient();
  const { data: charactersData } = await client.query<Characters>({
    query: GET_CHARACTERS,
  });

  return (
    <div className="star-wars-characters">
      <h1 className="text-lg text-center mb-4">All characters: </h1>
      {charactersData.allPeople.people.map((character: Characters) => (
        <ul
          className="data-part border-solid border-orange-400 border-2 mb-2 text-left p-2"
          key={character.id}
        >
          <li className="mb-2">
            <p className=" p-0.5">Name: {character.name}</p>
            <p className=" p-0.5">Birth Year: {character.birthYear}</p>
            <p className=" p-0.5">
              Species: {character.species?.name || 'unknown'}
            </p>
            <p className=" p-0.5">Homeworld: {character.homeworld.name}</p>
            <p className=" p-0.5">
              Films:{' '}
              {character.filmConnection.films
                .map((film) => film.title)
                .join(', ')}
            </p>
          </li>
          <Link
            href={`/character/${character.id}`}
            className="border-white border-solid border-2 py-1 px-2"
          >
            See character
          </Link>
        </ul>
      ))}
    </div>
  );
};
