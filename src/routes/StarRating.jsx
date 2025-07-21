import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, max = 5 }) => {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2;

  for (let i = 1; i <= max; i++) {
    if (i <= rounded) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (i - 0.5 === rounded) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }

  return <div style={{ fontSize: '1.5rem', display: 'flex' }}>{stars}</div>;
};


export default StarRating;