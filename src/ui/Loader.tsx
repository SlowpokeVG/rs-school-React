import { Component } from 'react';
import spinner from '../assets/img/spinner.gif';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={spinner} alt="Spinner" />
      </div>
    );
  }
}

export default Loader;
