import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { detail } from '../scripts/api';
import { ApiDetailsResponse, Gif } from '../types';
import Loader from '../ui/Loader';

function ResultDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const id = searchParams.get('details') || '';

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

  const [gif, setGif] = useState<Gif>();
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchGif = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await detail(id);
          const data: ApiDetailsResponse | undefined = result.data;
          if (result.success && data) {
            setGif(data.data);
          } else {
            setError(result.error || 'Failed to load GIFs.');
          }
        } catch {
          setError('An error occurred while fetching the GIF');
        } finally {
          setLoading(false);
        }
      };
      fetchGif();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="result-detail">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gif) {
    return <div>No GIF available</div>;
  }

  return (
    <div className="result-detail" ref={modalRef}>
      <div className="close-detail" onClick={handleClose}></div>
      <div className="result-title">{gif.title}</div>
      <div className="result-description">{gif.images.alt_text}</div>
      <div className="result-type">Type: {gif.type}</div>
      <div className="upload-date">Uploaded on: {gif.import_datetime}</div>
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
            {gif.user.avatar_url ? (
              <div className="author-image">
                <img
                  src={gif.user.avatar_url}
                  alt={`${gif.user.username}'s avatar`}
                />
              </div>
            ) : null}
            <div className="author-name">{gif.user.display_name}</div>
          </div>
          <div className="author-description">{gif.user.description}</div>
        </>
      )}
    </div>
  );
}

export default ResultDetails;
