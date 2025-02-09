import { ChangeEvent, FormEvent, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';
import '@testing-library/jest-dom';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useLocalStorage('query', '');
  const [searchString, setSearchString] = useState(query);

  const formSubmit = (query: string, event: FormEvent) => {
    event.preventDefault();
    searchParams.delete('page');
    searchParams.delete('details');
    setSearchParams(searchParams);
    setQuery(query);
  };

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setQuery(searchString);
    formSubmit(searchString, event);
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
