import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../context/themeContext';

function NotFoundScreen() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme + '-theme'}>
      <h1>404 Page Not Found</h1>
      <Link href="/">Return to main page</Link>
    </main>
  );
}

export default NotFoundScreen;
