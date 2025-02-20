import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDetailQuery } from '../redux/api';
import Loader from '../ui/Loader';
import Error from '../ui/Error';

function ResultDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const id = searchParams.get('details') || '';

  const { data, error, isLoading } = useDetailQuery({ id }, { skip: !id });

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  if (isLoading) {
    return (
      <div className="result-detail">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-detail">
        <Error error={error} />
      </div>
    );
  }

  const gif = data?.data;
  if (!gif) {
    return <div>No GIF available</div>;
  }

  return (
    id && (
      <div className="result-detail" ref={modalRef}>
        <div className="result-inner">
          <div className="result-content">
            <div className="close-detail" onClick={handleClose}></div>
            <div className="result-title">{gif.title}</div>
            <div className="result-description">{gif.images.alt_text}</div>
            <div className="result-type">Type: {gif.type}</div>
            <div className="upload-date">
              Uploaded on: {gif.import_datetime}
            </div>
            {gif.source && (
              <div className="source">
                <a href={gif.source} target="_blank" rel="noreferrer">
                  Source
                </a>
              </div>
            )}
            {gif.user && (
              <>
                <div className="author-title">Author: {gif.user.username}</div>
                <div className="author-profile">
                  {gif.user.avatar_url && (
                    <div className="author-image">
                      <img
                        src={gif.user.avatar_url}
                        alt={`${gif.user.username}'s avatar`}
                      />
                    </div>
                  )}
                  <div className="author-name">{gif.user.display_name}</div>
                </div>
                <div className="author-description">{gif.user.description}</div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default ResultDetails;
