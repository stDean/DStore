import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Coupons, deleteCoupons } from "../features/coupon/couponSlice";
import { toast } from "react-toastify";
import { Modal } from "../components";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },

  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount (%)",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const { coupons, message } = useSelector(({ coupon }) => coupon);
  const { user } = useSelector(({ auth }) => auth);

  const [couponId, setCouponId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
    setCouponId(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteCoupons({ id: couponId, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(Coupons(user.token));
  }, [dispatch, user.token, message]);

  const data1 = [];

  for (let i = 0; i < coupons?.length; i++) {
    data1.push({
      key: i + 1,
      name: coupons[i]?.name,
      discount: coupons[i]?.discount,
      expiry: new Date(coupons[i]?.expiry).toLocaleString(),
      action: (
        <div className="flex gap-3 justify-center">
          <Link
            to={`/admin/coupon/${coupons[i]._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(coupons[i]._id);
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
      <h1 className="mb-4 text-3xl font-semibold">Coupon List</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      {isModalOpen && (
        <Modal
          title="Are you sure you want to delete this brand"
          handleOk={deleteData}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default CouponList;
