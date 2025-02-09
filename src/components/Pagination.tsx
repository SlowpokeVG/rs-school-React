import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Pagination({ pagesCount }: { pagesCount: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1
  );

  const setPage = (newPage: number) => {
    if (newPage !== currentPage) {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
      setCurrentPage(
        searchParams.get('page')
          ? parseInt(searchParams.get('page') as string)
          : 1
      );
    }
  };

  return (
    <div className="navigation">
      <ul className="navigation-links">
        {Array.from({ length: pagesCount }, (_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            key={i + 1}
            className={currentPage === i + 1 ? 'nav-link active' : 'nav-link'}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
