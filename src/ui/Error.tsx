import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

function Error({ error }: ErrorProps) {
  if (error) {
    return (
      <div className="error-message">
        {error && 'status' in error && <p>Error: {error.status}</p>}
        {error && !('status' in error) && !('data' in error) && (
          <p>Something went wrong</p>
        )}
      </div>
    );
  }
}

export default Error;
