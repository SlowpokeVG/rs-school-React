import { SearchProps } from '../types';

function Search({ formSubmit, query, setQuery }: SearchProps) {
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-form">
      <form
        className="search-form-wrapper"
        onSubmit={(event) => formSubmit(query, event)}
      >
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
