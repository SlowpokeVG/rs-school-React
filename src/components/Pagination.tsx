import { Link, useParams } from 'react-router-dom';

function Pagination({ pagesCount }: { pagesCount: number }) {
  const { page } = useParams<{ page: string }>();
  const currentPage = page ? parseInt(page) || 1 : 1;
  return (
    <div className="navigation">
      <ul className="navigation-links">
        {Array.from({ length: pagesCount }, (_, i) => (
          <li
            key={i + 1}
            className={currentPage === i + 1 ? 'nav-link active' : 'nav-link'}
          >
            <Link to={`/${i + 1}`}>{i + 1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
