import ReactStars from "react-rating-stars-component";

const Stars = ({ size, val, edit=false, onChange }) => {
  return (
    <ReactStars
      count={5}
      value={val}
      edit={edit}
      activeColor="#ffd700"
      size={size}
      onChange={onChange}
    />
  );
};

export default Stars;
