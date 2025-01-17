import { ChangeEvent, FormEvent } from 'react';
import { SearchProps } from '../types';

function Search({ query, setQuery, formSubmit }: SearchProps) {
  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    formSubmit(query, event);
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
          value={query}
          onChange={inputChange}
        />
        <button type="submit" className="button"></button>
      </form>
    </div>
  );
}

export default Search;
