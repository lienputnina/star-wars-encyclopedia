import { FC } from 'react';

export interface Character {
  character: {
    name: string;
    birthYear: string;
    species?: { name: string | null };
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

export const CharacterDetails: FC<Character> = ({ character }) => {
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
