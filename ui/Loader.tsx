import spinner from '../public/img/spinner.gif';

function Loader() {
  return (
    <div className="loader">
      <img src={spinner} alt="Spinner" />
    </div>
  );
}

export default Loader;
