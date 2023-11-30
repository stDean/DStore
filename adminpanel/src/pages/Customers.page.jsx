import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/customer/customerSlice";

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const { customers } = useSelector(({ customer }) => customer);

  useEffect(() => {
    dispatch(getAllUsers(user.token));
  }, [dispatch, user.token]);

  const { users } = customers;
  const data1 = [];

  for (let i = 0; i < users?.length; i++) {
    data1.push({
      key: i + 1,
      name: `${users[i]?.firstName} ${users[i]?.lastName}`,
      email: users[i]?.email,
      mobile: users[i]?.mobile,
    });
  }

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Customers</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default Customers;
