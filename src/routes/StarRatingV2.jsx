import '../styles/StarRatingV2.css';

const StarRatingV2 = ({ rating, max = 5 }) => {
  return (
    <div className="star-rating">
      {[...Array(max)].map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div key={i} className="star">
            <div className="star-background">★</div>
            <div
              className="star-foreground"
              style={{ width: `${fillPercent}%` }}
            >
              ★
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingV2;
