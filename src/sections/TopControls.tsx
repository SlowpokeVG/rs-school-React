import Title from '../components/Title';
import Search from '../components/Search';
import ThemeToggle from '../components/ThemeToggle';

interface TopControlsProps {
  fetchGifs: (query: string) => void;
}

function TopControls({ fetchGifs }: TopControlsProps) {
  return (
    <section className="top">
      <Title />
      <ThemeToggle />
      <Search fetchGifs={fetchGifs} />
    </section>
  );
}

export default TopControls;
