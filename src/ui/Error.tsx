function Error( {error}:{error:string} ) {
  return (
    <div className="error">
      <p>An error occured:</p>
      <p>{error}</p>
    </div>
  );
}

export default Error;
