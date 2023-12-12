import Stars from "./Stars";
import { Button } from "./Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { rateProduct } from "../../feature/products/productSlice";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");

  const {
    currentUser: { token },
  } = useSelector(({ auth }) => auth);
  const { isSuccess, isError, message } = useSelector(({ product }) => product);

  const handleRating = e => {
    e.preventDefault();
    if (comment === "") {
      toast.error("cannot submit a review without a comment");
    } else {
      dispatch(
        rateProduct({
          token,
          data: {
            productId,
            comment,
            star,
          },
        })
      );

      if (isSuccess) {
        toast.success(message);
        setComment("");
        setStar(0);
      } else if (isError) {
        toast.error(message);
      }
    }
  };

  return (
    <div className="py-4 border-b w-full">
      <form action="" className="space-y-4" onSubmit={handleRating}>
        <div className="flex flex-col">
          <label htmlFor="rating">
            Rating
            <Stars size={15} val={star} onChange={e => setStar(e)} edit />
          </label>
        </div>

        <div className="flex flex-col">
          <p>Comment(1500)</p>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            placeholder="write comment here"
            className="border rounded-md outline-none border-black p-3 w-full mt-1"
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <Button text="SUBMIT REVIEW" mr />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
