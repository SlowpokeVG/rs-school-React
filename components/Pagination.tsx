import { useRouter } from 'next/router';

function Pagination({ pagesCount }: { pagesCount: number }) {
  const router = useRouter();
  const currentPage = Array.isArray(router.query.page)
  ? parseInt(router.query.page[0] as string)
  : router.query.page
  ? parseInt(router.query.page as string)
  : 1;

  const setPage = (newPage: number) => {
    if (newPage !== currentPage) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage.toString() },
      });
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
            style={{ cursor: 'pointer' }}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
