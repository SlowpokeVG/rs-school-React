import Title from '../components/Title';
import Search from '../components/Search';

interface TopControlsProps {
  fetchGifs: (query: string) => void;
}

function TopControls({ fetchGifs }: TopControlsProps) {
  return (
    <section className="top">
      <Title />
      <Search fetchGifs={fetchGifs} />
    </section>
  );
}

export default TopControls;
