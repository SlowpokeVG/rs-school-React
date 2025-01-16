import { Component } from 'react';

class ErrorButton extends Component {
  state = {
    errorState: false,
  };

  handleClick = () => {
    this.setState({ errorState: true });
  };

  render() {
    if (this.state.errorState) {
      throw new Error('Fake Error');
    }

    return (
      <section className="error-section">
        <div className="error">
          <div className="error-button">
            <div className="error-button-text" onClick={this.handleClick}>
              Show Error
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorButton;
