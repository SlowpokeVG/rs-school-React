import { useNavigate, useParams } from 'react-router-dom';

function ResultDetails() {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/${page}`);
  };

  const { id } = useParams<{ id: string }>();
  return (
    <div className="result-detail">
      <div className="close-detail" onClick={handleClose}></div>
      <div className="result-title">{id}</div>
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
