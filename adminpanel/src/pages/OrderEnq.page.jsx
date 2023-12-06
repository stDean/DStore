import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderByUserId } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack, BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const OrderEnq = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders: { allOrders },
    message,
  } = useSelector(({ order }) => order);
  const { user } = useSelector(({ auth }) => auth);

  const allProducts = [...allOrders[0].products];

  useEffect(() => {
    dispatch(getOrderByUserId({ id: userId, token: user?.token }));
  }, [dispatch, userId, user?.token]);

  console.log([...allOrders[0].products]);
  const goBack = () => {
    navigate(-1);
  };

  const data1 = [];

  for (let i = 0; i < allProducts.length; i++) {
    data1.push({
      key: i + 1,
      name: allProducts[i].product.title,
      brand: allProducts[i].product.brand,
      count: allProducts[i].quantity,
      amount: allProducts[i].product.price,
      color: allProducts[i].product.color,
      date: allProducts[i].product.createdAt,
      action: (
        <>
          <Link
            to="/"
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <Link
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            to="/"
          >
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

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

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default OrderEnq;
