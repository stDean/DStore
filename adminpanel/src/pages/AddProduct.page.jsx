import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, CustomInput } from "../components";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddProduct = () => {
  const [desc, setDesc] = useState("");

  const handleDescChange = e => {
    setDesc(e);
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Product</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="">
          <CustomInput type="text" label="Product Name" name="title" />

          <ReactQuill
            theme="snow"
            value={desc}
            onChange={e => handleDescChange(e)}
          />

          <div className="mt-4">
            <CustomInput type="number" label="Product Price" name="price" />
          </div>

          <select
            name="brand"
            id="brand"
            className="w-full p-3 rounded-md mb-4 outline-none border"
          >
            <option value="">Select a brand</option>
          </select>

          <select
            name="category"
            id="category"
            className="w-full p-3 rounded-md mb-4 outline-none border"
          >
            <option value="">Select a category</option>
          </select>

          <select
            name="tag"
            id="tag"
            className="w-full p-3 rounded-md mb-4 outline-none border"
          >
            <option value="">Select a Tag</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>

          <CustomInput type="number" label="Product Quantity" name="quantity" />

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>

          <Button title="Add Product" />
        </form>
      </div>
    </>
  );
};

export default AddProduct;