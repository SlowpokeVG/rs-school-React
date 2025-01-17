import spinner from '../assets/img/spinner.gif';

function Loader() {
  return (
    <div className="loader">
      <img src={spinner} alt="Spinner" />
    </div>
  );
}

export default Loader;
