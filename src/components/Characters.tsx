'use client';

import { gql } from '@apollo/client';
import { FC } from 'react';
import Link from 'next/link';

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

export const Characters: FC<{ people: Characters[] }> = ({
  people,
}: {
  people: Characters[];
}) => {
  return (
    <div className="star-wars-characters mt-5">
      <h1 className="text-lg text-center mb-4">Star Wars characters </h1>
      {people.map((character: Characters) => (
        <ul
          className="data-part border-solid border-amber-400 border-2 rounded-md mb-4 text-left p-5"
          key={character.id}
        >
          <li className="mb-4">
            <h2 className="text-lg font-medium">{character.name}</h2>
            <div className="character-description flex">
              <p>
                Born in year {character.birthYear} on {character.homeworld.name}{' '}
                of species {character.species?.name || 'unknown'}
              </p>
            </div>
            <p className="character-films">
              Films:{' '}
              {character.filmConnection.films
                .map((film) => film.title)
                .join(', ')}
            </p>
          </li>
          <Link
            href={`/character/${character.id}`}
            className="border-white border-solid border-2 round-md p-1.5 "
          >
            See character
          </Link>
        </ul>
      ))}
    </div>
  );
};
