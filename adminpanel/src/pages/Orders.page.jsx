import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, getAllOrders } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import { Modal } from "../components";

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Order By",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount ($)",
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

const Orders = () => {
  const dispatch = useDispatch();
  const {
    orders: { allOrders },
    message,
  } = useSelector(({ order }) => order);
  const { user } = useSelector(({ auth }) => auth);

  const [orderId, setOrderId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
    setOrderId(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteOrder({ id: orderId, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllOrders({ token: user.token }));
  }, [dispatch, user.token, message]);

  const data1 = [];

  for (let i = 0; i < allOrders?.length; i++) {
    data1.push({
      key: i + 1,
      name: `${allOrders[i]?.orderBy.firstName} ${allOrders[i]?.orderBy.lastName}`,
      product: (
        <Link
          to={`/admin/orders/${allOrders[i]?.orderBy._id}`}
          className="hover:underline hover:underline-offset-2"
        >
          view all orders
        </Link>
      ),
      amount: allOrders[i]?.paymentIntent.amount,
      date: new Date(allOrders[i]?.createdAt).toLocaleString(),
      action: (
        <div className="flex gap-3 justify-center">
          <Link
            to={`/admin/orders/${allOrders[i]?._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <AiOutlineEye />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(allOrders[i]?._id);
            }}
          >
            <AiFillDelete />
          </div>
        </div>
      ),
    });
  }

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Orders</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      {isModalOpen && (
        <Modal
          title="Are you sure you want to delete this order?"
          handleOk={deleteData}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default Orders;
