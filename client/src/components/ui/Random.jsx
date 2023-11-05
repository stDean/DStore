import ReactStars from "react-rating-stars-component";

export const Random = ({ imgPath, title, price }) => {
  return (
    <div className="flex items-center gap-4 border-b last:border-none py-5 first:pt-0">
      <img src={imgPath} alt="" width={80} />

      <div>
        <h1 className="text-sm font-semibold">{title}</h1>

        {/* stars */}
        <ReactStars
          count={5}
          value="3"
          edit={false}
          activeColor="#ffd700"
          size={20}
        />

        <p className="text-sm font-semibold text-blue-300">{price}</p>
      </div>
    </div>
  );
};
