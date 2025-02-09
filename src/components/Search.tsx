import { ChangeEvent, FormEvent, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  fetchGifs: (query: string) => void;
}

function Search({ fetchGifs }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useLocalStorage('query', '');
  const [searchString, setSearchString] = useState(query);

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setQuery(searchString);
    searchParams.delete('page');
    searchParams.delete('details');
    setSearchParams(searchParams);
    fetchGifs(searchString);
  }

  return (
    <div className="search-form">
      <form className="search-form-wrapper" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search"
          autoComplete="off"
          value={searchString}
          onChange={inputChange}
        />
        <button type="submit" className="button"></button>
      </form>
    </div>
  );
}

export default Search;
