import { Link } from 'react-router-dom';

function NotFoundScreen() {
  return (
    <main>
      <h1>404 Page Not Found</h1>
      <Link to={`/`}>Return to main page</Link>
    </main>
  );
}

export default NotFoundScreen;
