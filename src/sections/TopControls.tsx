import Title from '../components/Title';
import Search from '../components/Search';
import { SearchProps } from '../types';

function TopControls( {formSubmit}: SearchProps ) {
  return (
    <section className="top">
      <Title />
      <Search formSubmit={formSubmit} />
    </section>
  );
}

export default TopControls;
