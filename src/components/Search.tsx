'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Characters, GET_CHARACTERS } from './Characters';
import { CharacterNotFound } from './CharacterNotFound';
import ErrorPage from './ErrorPage';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredCharacters = charactersData.allPeople.people.filter(
    (character: Characters) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // todo - toSorted sort data a/z z/a. Data sorted A-Z by default

  return (
    <div className="search">
      <input
        id="character-search"
        name="character-search"
        value={searchQuery}
        placeholder="Search character"
        onChange={handleInputChange}
        className="flex flex-grow border-slate-200  border-2 rounded-md h-8 text-slate-200 py-4 pl-5 bg-transparent w-full max-w-lg mb-4"
      />
      <Characters people={filteredCharacters} />
    </div>
  );
};
