import { ChangeEvent, FormEvent, useState } from 'react';
import { SearchProps } from '../types';

function Search({ query, setQuery, formSubmit }: SearchProps) {
  const [searchString, setSearchString] = useState(query);

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
