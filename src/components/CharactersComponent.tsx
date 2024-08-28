import { gql } from '@apollo/client';
import { client } from '../server/apollo-client';
import { FC } from 'react';

const GET_CHARACTERS = gql`
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
        starshipConnection {
          starships {
            name
          }
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
  id: number;
  name: string;
  birthYear: string;
  species: { name: string };
  homeworld: { name: string };
  starshipConnection: {
    starships: [{ name: string }];
  };
  filmConnection: {
    films: [{ title: string }];
  };
}

export const CharactersComponent: FC = async () => {
  const { data: characterData } = await client.query<Characters>({
    query: GET_CHARACTERS,
  });

  return (
    <div className="star-wars-characters pt-8">
      <h1 className="text-lg text-center pb-4">Star Wars data: </h1>
      {characterData.allPeople.people.map((character: Characters) => (
        <ul
          key={character.id}
          className="border-solid border-orange-400 border-2 mb-2 text-left p-2"
        >
          <li className="list-none p-0.5">Name: {character.name}</li>
          <li className="list-none p-0.5">Birth Year: {character.birthYear}</li>
          <li className="list-none p-0.5">
            Species: {character.species?.name || 'unknown'}
          </li>
          <li className="list-none p-0.5">
            Homeworld: {character.homeworld.name}
          </li>
          <li className="list-none p-0.5">
            Starships:{' '}
            {character.starshipConnection?.starships
              .map((starship) => starship.name)
              .join(', ') || 'no starships'}
          </li>
          <li className="list-none p-0.5">
            Films:{' '}
            {character.filmConnection.films
              .map((film) => film.title)
              .join(', ')}
          </li>
        </ul>
      ))}
    </div>
  );
};
