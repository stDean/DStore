import { Column } from "@ant-design/plots";
import { DashStatus, Review } from "../components";
import { Table } from "antd";

// chart data
const data = [
  {
    type: "Jan",
    sales: 38,
  },
  {
    type: "Feb",
    sales: 52,
  },
  {
    type: "Mar",
    sales: 61,
  },
  {
    type: "Apr",
    sales: 145,
  },
  {
    type: "May",
    sales: 48,
  },
  {
    type: "Jun",
    sales: 38,
  },
  {
    type: "July",
    sales: 38,
  },
  {
    type: "Aug",
    sales: 38,
  },
  {
    type: "Sept",
    sales: 38,
  },
  {
    type: "Oct",
    sales: 38,
  },
  {
    type: "Nov",
    sales: 38,
  },
  {
    type: "Dec",
    sales: 38,
  },
];

const config = {
  data,
  xField: "type",
  yField: "sales",
  color: ({ type }) => {
    return "#ffd333";
  },
  label: {
    position: "middle",
    style: {
      fill: "#FFFFFF",
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
      alias: "Income",
    },
  },
};

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
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-12 gap-6">
        <DashStatus
          title="Total Sales"
          percent="25"
          smallText="Compares to April 2022"
          val="2500"
        />
        <DashStatus
          title="Total Sales"
          percent="35"
          smallText="Compares to April 2022"
          val="2500"
        />
        <DashStatus
          title="Total Sales"
          percent="45"
          smallText="Compares to April 2022"
          val="2500"
        />

        <div className="col-span-5 bg-gray-100 rounded-md shadow-lg p-4">
          <h1 className="text-xl font-semibold mb-5">Recent Orders</h1>
          <div>
            <Table columns={columns} dataSource={data1} size="small" />
          </div>
        </div>

        <div className="col-span-7 bg-gray-100 rounded-md shadow-lg p-4">
          <h1 className="text-xl font-semibold mb-5">Income Sales</h1>
          <Column {...config} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
