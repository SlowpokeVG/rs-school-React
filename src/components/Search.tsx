//import { useState } from 'react';

function Search() {
  return (
    <div className="search-form">
      <div className="search-form-wrapper">
        <input
          type="text"
          name="search"
          className="search"
          placeholder="Search"
          autoComplete="off"
        />
        <button type="submit" className="button"></button>
      </div>
    </div>
  );
}

export default Search;
