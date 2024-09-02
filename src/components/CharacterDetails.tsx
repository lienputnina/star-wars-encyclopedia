export interface Character {
  id: string;
  name: string;
  birthYear?: string;
  species?: { name: string | null };
  homeworld?: {
    name: string;
    climates: string;
    gravity: string;
    terrains?: string[] | undefined;
  };

  filmConnection?: {
    films: [{ title: string }];
  };
}

export const CharacterDetails = ({ character }: { character: Character }) => {
  return (
    <div className="star-wars-character border-solid border-amber-400  border-2 rounded-md mb-2 text-left p-5">
      <h1>{character.name}</h1>
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
