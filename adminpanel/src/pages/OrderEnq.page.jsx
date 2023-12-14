import { Table } from "antd";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editOrder, getOrderByUserId } from "../features/order/orderSlice";

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
    title: "Quantity",
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
  const { id: userId, orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    ordersByUser: { allOrders },
  } = useSelector(({ order }) => order);
  const { user } = useSelector(({ auth }) => auth);

  const allProducts = allOrders
    ? [...allOrders[0]?.orderItems.map(i => i)]
    : [];

  useEffect(() => {
    dispatch(getOrderByUserId({ id: userId, token: user?.token, orderId }));
  }, [dispatch, userId, user?.token, orderId]);

  const goBack = () => {
    navigate(-1);
  };

  const orderStatusFromDb =
    allOrders && allOrders.map(i => i.orderStatus).join("");

  const setStatus = e => {
    dispatch(editOrder({ orderId, data: e, token: user?.token }));
  };

  const data1 = [];

  for (let i = 0; i < allProducts.length; i++) {
    data1.push({
      key: i + 1,
      name: allProducts[i].product.title,
      brand: allProducts[i].product.brand,
      count: allProducts[i].quantity,
      amount: allProducts[i].product.price,
      color: allProducts[i].color.title,
      date: allProducts[i].product.createdAt,
      action: (
        <>
          <select
            name="status"
            className="border p-2 rounded-md"
            defaultValue={orderStatusFromDb}
            onClick={e => setStatus(e.target.value)}
          >
            <option value="ordered">Ordered</option>
            <option value="processed">Processed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
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
