'use client';

import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Characters } from '../Characters';
import { CharacterNotFound } from '../CharacterNotFound';
import ErrorPage from '../ErrorPage';

import './Search.css';

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
      }
    }
  }
`;

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const {
    data: charactersData,
    loading,
    error,
  } = useQuery<Characters>(GET_CHARACTERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  if (!charactersData) {
    return <CharacterNotFound />;
  }

  const filteredCharacters = charactersData.allPeople.people
    .filter((character: Characters) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .toSorted((a: Characters, b: Characters) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );

  const sortCharacters = () => {
    setIsAscending(!isAscending);
  };

  return (
    <div className="search">
      <div className="search-bar flex ">
        <input
          id="character-search"
          name="character-search"
          type="text"
          value={searchQuery}
          placeholder="Search characters"
          onChange={handleInputChange}
          className="flex flex-grow border-slate-200  border-2 rounded-md h-8 text-slate-200 py-4 pl-5 bg-transparent w-full max-w-lg mb-4"
        />
        <button
          className={isAscending ? 'sort-descending' : 'sort-ascending'}
          onClick={sortCharacters}
          aria-label={isAscending ? 'Sort Descending' : 'Sort Ascending'}
        />
      </div>
      <Characters people={filteredCharacters} />
    </div>
  );
};
