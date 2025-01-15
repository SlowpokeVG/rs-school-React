import Title from '../components/Title';
import Search from '../components/Search';
import { SearchProps } from '../types';

function TopControls({ formSubmit, query, setQuery }: SearchProps) {
  return (
    <section className="top">
      <Title />
      <Search 
        formSubmit={formSubmit} 
        query={query}
        setQuery={setQuery}
      />
    </section>
  );
}

export default TopControls;
