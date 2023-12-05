import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { singleOrder } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

const OrderEnq = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { orders, message } = useSelector(({ order }) => order);

  useEffect(() => {
    dispatch(singleOrder({ id }));
  }, [dispatch, id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
     <div className="flex justify-between items-center">
        <h1 className="mb-4 text-3xl font-semibold">Single Enquiry</h1>
        <button
          onClick={goBack}
          className="rounded-md py-2 px-3 border-none cursor-pointer flex items-center gap-2 transform hover:scale-110"
        >
          <BiArrowBack /> Go Back
        </button>
      </div>

    </>
  );
};

export default OrderEnq;
