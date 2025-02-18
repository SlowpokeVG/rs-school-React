import { Component, ReactNode } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <h2>Something went wrong.</h2>
          <p>
            You probably pressed that button that was irrelevant since the first
            task.
          </p>
          <div
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={this.resetError}
          >
            You gotta get back.
          </div>
          <p>
            <small>Back to the past.</small>
          </p>
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTIxOWRjY2Y4MWJiYWNpZWVidGpjc24wcnFmajdyZ3Zxb2xwMjNpaW4wcjBhMGs1NyZlcD12MV9naWZzX2dpZklkJmN0PWc/2fWvmhF4TiBGw/100.gif"
            alt="Samurai Jack"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
