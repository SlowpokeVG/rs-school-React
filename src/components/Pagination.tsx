import { useSearchParams } from 'react-router-dom';

function Pagination({ pagesCount }: { pagesCount: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  const currentPage = page ? parseInt(page) || 1 : 1;

  const setPage = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
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
