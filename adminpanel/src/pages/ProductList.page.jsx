import { useState, useEffect } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Products, deleteProducts } from "../features/product/productSlice";
import { Modal } from "../components";
import { toast } from "react-toastify";

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, message } = useSelector(({ product }) => product);
  const { user } = useSelector(({ auth }) => auth);

  const [productId, setProductId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
    setProductId(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteProducts({ id: productId, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(Products());
  }, [dispatch, message]);

  const data1 = [];
  const { products: allProducts } = products;

  for (let i = 0; i < allProducts?.length; i++) {
    data1.push({
      key: i + 1,
      title: allProducts[i]?.title,
      brand: allProducts[i]?.brand,
      category: allProducts[i]?.category,
      color: allProducts[i]?.color.join(", "),
      price: allProducts[i]?.price,
      action: (
        <div className="flex gap-3 justify-center">
          <Link
             to={`/admin/product/${allProducts[i]._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(allProducts[i]._id);
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
      <h1 className="mb-4 text-3xl font-semibold">Product List</h1>
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

export default ProductList;
