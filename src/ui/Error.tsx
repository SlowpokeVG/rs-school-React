import { Component } from 'react';

interface ErrorProps {
  error: string;
}

class Error extends Component<ErrorProps> {
  render() {
    const { error } = this.props;

    return (
      <div className="error-message">
        <p>An error occurred:</p>
        <p>{error}</p>
      </div>
    );
  }
}

export default Error;
