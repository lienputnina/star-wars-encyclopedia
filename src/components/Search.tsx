'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="main">
      <label htmlFor="character-search" className="search-label">
        Search:
      </label>
      <input
        id="character-search"
        name="character-search"
        placeholder={placeholder}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        className="flex flex-grow border-slate-200 border-2 rounded h-8 text-slate-700 py-4 pl-9 bg-transparent w-full max-w-lg mb-4"
      />
    </div>
  );
};
