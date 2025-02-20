import Title from '../components/Title';
import Search from '../components/Search';
import ThemeToggle from '../components/ThemeToggle';

function TopControls() {
  return (
    <section className="top">
      <Title />
      <ThemeToggle />
      <Search />
    </section>
  );
}

export default TopControls;
