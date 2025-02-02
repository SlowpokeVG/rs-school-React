import { Link } from 'react-router-dom';

function NotFoundScreen() {
  return (
    <main>
      <Link to={`/`}>Go home, GI</Link>
    </main>
  );
}

export default NotFoundScreen;
