import React from "react";

const Review = ({ imgUrl, title, subTitle, starCount }) => {
  return (
    <div>
      <div>
        <img src={imgUrl} alt="" />

        <div>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </div>
      </div>

      <div>Stars</div>
    </div>
  );
};

export default Review;
