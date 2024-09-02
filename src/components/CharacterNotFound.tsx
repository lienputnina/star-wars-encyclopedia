import { NextPage } from 'next';

export const CharacterNotFound: NextPage = () => (
  <div className="p-10">
    <h1>Character Not Found</h1>
    <p>Looks like this character is not in the database.</p>
  </div>
);
