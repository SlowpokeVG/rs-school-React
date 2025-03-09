import Image from 'next/image';
import spinner from '../public/img/spinner.gif';

function Loader() {
  return (
    <div className="loader">
      <Image src={spinner} alt="Spinner" />
    </div>
  );
}

export default Loader;
