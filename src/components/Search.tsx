import { ChangeEvent, FormEvent, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';
import { setQuery } from '../redux/slices/searchSlice';
import { useDispatch } from 'react-redux';

function Search() {
  const dispatch = useDispatch();
  const [savedQuery, setSavedQuery] = useLocalStorage('query', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(savedQuery);

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    setSavedQuery(searchString);
    searchParams.delete('page');
    searchParams.delete('details');
    setSearchParams(searchParams);
    dispatch(setQuery(searchString));
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
