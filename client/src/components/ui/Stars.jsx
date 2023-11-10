import ReactStars from "react-rating-stars-component";

const Stars = ({ size }) => {
  return (
    <ReactStars
      count={5}
      value={4}
      edit={false}
      activeColor="#ffd700"
      size={size}
    />
  );
};

export default Stars;
