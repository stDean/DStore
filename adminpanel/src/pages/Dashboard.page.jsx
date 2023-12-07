import { Column } from "@ant-design/plots";
import { DashStatus, Review } from "../components";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  getMonthlyOrders,
  getYearlyOrders,
} from "../features/order/orderSlice";

// table data
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [];

for (let i = 0; i < 40; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    orderByMonth,
    yearlyOrder,
    orders: { allOrders },
  } = useSelector(({ order }) => order);
  const { user } = useSelector(({ auth }) => auth);

  const [monthlyDataIncome, setMonthlyDataIncome] = useState([]);
  const [monthlyDataSales, setMonthlyDataSales] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyOrders({ token: user.token }));
    dispatch(getYearlyOrders({ token: user.token }));
    dispatch(getAllOrders({ token: user.token }));
  }, [dispatch, user.token]);

  useEffect(() => {
    let mL = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let monthlyOrderIncome = [];
    let monthlyOrderSales = [];
    for (let i = 0; i < orderByMonth.length; i++) {
      const ele = orderByMonth[i];

      monthlyOrderIncome.push({
        type: mL[ele?._id?.month],
        income: ele?.amount,
      });

      monthlyOrderSales.push({
        type: mL[ele?._id?.month],
        sales: ele?.count,
      });
    }

    setMonthlyDataIncome(monthlyOrderIncome);
    setMonthlyDataSales(monthlyOrderSales);
  }, [orderByMonth]);

  const config = {
    data: monthlyDataIncome,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#000000",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      income: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: monthlyDataSales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#000000",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-12 gap-6">
        <DashStatus
          title="Total Sales Income"
          // percent="25"
          smallText="Yearly total Income"
          val={`$${yearlyOrder[0]?.amount}`}
        />
        <DashStatus
          title="Total Sales Count"
          // percent="35"
          smallText="Yearly total Sales"
          val={yearlyOrder[0]?.count}
        />

        <div className="col-span-6 bg-gray-100 rounded-md shadow-lg p-4">
          <h1 className="text-xl font-semibold mb-5">Income Sales</h1>
          <Column {...config} />
        </div>

        <div className="col-span-6 bg-gray-100 rounded-md shadow-lg p-4">
          <h1 className="text-xl font-semibold mb-5">Sales Count</h1>
          <Column {...config2} />
        </div>

        <div className="col-span-12 bg-gray-100 rounded-md shadow-lg p-4">
          <h1 className="text-xl font-semibold mb-5">Recent Orders</h1>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
