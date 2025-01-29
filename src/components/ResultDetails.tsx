import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { detail } from '../scripts/api';
import { ApiDetailsResponse, Gif } from '../types';
import Loader from '../ui/Loader';

function ResultDetails() {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const handleClose = () => {
    if (page) navigate(`/${page}`);
    else navigate('/');
  };

  const { id } = useParams<{ id: string }>();

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
    <div className="result-detail">
      <div className="close-detail" onClick={handleClose}></div>
      <div className="result-title">{gif.title}</div>
      <div className="result-description">
        Fragrant black coffee with Jameson Irish whiskey and whipped milk
      </div>
      <div className="result-type">type: gif</div>

      <div className="author-title">Author:</div>
      <div className="author-profile">
        <div className="author-image">
          <img src="img/menu/coffee/coffee-1.jpg" alt="" />
        </div>
        <div className="author-name">Evan Hillton</div>
      </div>
      <div className="author-description">
        Fragrant black coffee with Jameson Irish whiskey and whipped milk
      </div>
    </div>
  );
}

export default ResultDetails;
