import { ChangeEvent, FormEvent, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { setQuery } from '../redux/slices/searchSlice';
import { useDispatch } from 'react-redux';

function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [savedQuery, setSavedQuery] = useLocalStorage('query', '');
  const [searchString, setSearchString] = useState(savedQuery);

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    setSavedQuery(searchString);
    dispatch(setQuery(searchString));

    router.push({
      pathname: router.pathname,
      query: { search: searchString },
    });
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
