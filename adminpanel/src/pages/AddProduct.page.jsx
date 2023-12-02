import { Select } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, CustomInput } from "../components";
import { Brands } from "../features/brand/brandSlice";
import { productCategory } from "../features/category/categorySlice";
import { Colors } from "../features/color/colorSlice";
import { createProducts } from "../features/product/productSlice";
import { deleteImage, imageUpload } from "../features/upload/uploadSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { brands } = useSelector(({ brand }) => brand);
  const { productCategories: categories } = useSelector(
    ({ productCategory }) => productCategory
  );
  const { colors } = useSelector(({ color }) => color);
  const { images } = useSelector(({ image }) => image);
  const { isSuccess, isError } = useSelector(({ product }) => product);

  const allColors = colors.map(item => ({
    value: item._id,
    label: item.title,
  }));
  const [color, setColor] = useState([]);

  let img;
  if (!images.msg) {
    img = images.map(img => ({
      url: img.url,
      public_id: img.public_id,
    }));
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      price: "",
      brand: "",
      category: "",
      tag: "",
      quantity: "",
    },
    onSubmit: async values => {
      dispatch(createProducts({ token: user.token, data: values }));
      if (isSuccess) {
        toast.success("Product created successfully");
        formik.resetForm();
        setColor([]);
        setTimeout(() => {
          navigate("/admin/list-product");
        }, 3000);
      } else if (isError) {
        toast.error("Something went wrong");
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      desc: Yup.string().required("Description is required"),
      price: Yup.number().required("Product price is required"),
      brand: Yup.string().required("Brand is required"),
      category: Yup.string().required("Product category is required"),
      tag: Yup.string().required("Product tag is required"),
      quantity: Yup.number().required("Quantity is required"),
      color: Yup.array()
        .required("Color is required")
        .min(1, "pick at least one color"),
    }),
  });
  formik.values.color = color ? color : "";
  formik.values.images = img;

  useEffect(() => {
    dispatch(Brands(user.token));
    dispatch(productCategory());
    dispatch(Colors());
  }, [dispatch, user.token]);

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Product</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="space-y-4"
          encType="multiple/form-data"
        >
          <div>
            <CustomInput
              type="text"
              label="Product Name"
              name="title"
              onChange={formik.handleChange("title")}
              value={formik.values.title}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.title ? "block" : "hidden"
              }`}
            >
              {formik.touched.title && formik.errors.title}
            </p>
          </div>

          <div>
            <ReactQuill
              theme="snow"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.desc ? "block" : "hidden"
              }`}
            >
              {formik.touched.desc && formik.errors.desc}
            </p>
          </div>

          <div>
            <CustomInput
              type="number"
              label="Product Price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.price ? "block" : "hidden"
              }`}
            >
              {formik.touched.price && formik.errors.price}
            </p>
          </div>

          <div>
            <select
              name="brand"
              id="brand"
              className="w-full p-3 rounded-md outline-none border"
              onChange={formik.handleChange}
              value={formik.values.brand}
            >
              <option value="">Select a brand</option>
              {brands.map(brand => (
                <option value={brand.title} key={brand._id}>
                  {brand.title}
                </option>
              ))}
            </select>
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.brand ? "block" : "hidden"
              }`}
            >
              {formik.touched.brand && formik.errors.brand}
            </p>
          </div>

          <div>
            <select
              name="category"
              id="category"
              className="w-full p-3 rounded-md outline-none border"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option value={category.title} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.category ? "block" : "hidden"
              }`}
            >
              {formik.touched.category && formik.errors.category}
            </p>
          </div>

          <div>
            <Select
              mode="multiple"
              allowClear
              className="w-full text-black"
              placeholder="select color"
              defaultValue={color}
              onChange={e => setColor(e)}
              options={allColors}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.color ? "block" : "hidden"
              }`}
            >
              {formik.touched.color && formik.errors.color}
            </p>
          </div>

          <div>
            <select
              name="tag"
              id="tag"
              className="w-full p-3 rounded-md outline-none border"
              onChange={formik.handleChange}
              value={formik.values.tag}
            >
              <option value="">Select a Tag</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.tag ? "block" : "hidden"
              }`}
            >
              {formik.touched.tag && formik.errors.tag}
            </p>
          </div>

          <div>
            <CustomInput
              type="number"
              label="Product Quantity"
              name="quantity"
              onChange={formik.handleChange}
              value={formik.values.quantity}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.quantity ? "block" : "hidden"
              }`}
            >
              {formik.touched.quantity && formik.errors.quantity}
            </p>
          </div>

          <div className="bg-white border p-10 text-center">
            <Dropzone
              onDrop={acceptedFiles => {
                dispatch(
                  imageUpload({ token: user.token, data: acceptedFiles })
                );
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="cursor-pointer">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {!images.msg && (
            <div className="showImages flex">
              {images.map(img => (
                <div key={img.asset_id} className="relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      dispatch(
                        deleteImage({
                          id: img.public_id.split("/")[2],
                          token: user.token,
                        })
                      )
                    }
                  >
                    <IoClose />
                  </button>
                  <img src={img.url} alt="" width={200} height={200} />
                </div>
              ))}
            </div>
          )}

          <Button title="Add Product" />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
