import ReactStars from "react-rating-stars-component";

const Stars = ({ size, val }) => {
  return (
    <ReactStars
      count={5}
      value={val}
      edit={false}
      activeColor="#ffd700"
      size={size}
    />
  );
};

export default Stars;
