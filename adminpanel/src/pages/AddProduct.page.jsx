import { Select } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { IoClose } from "react-icons/io5";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, CustomInput } from "../components";
import { Brands } from "../features/brand/brandSlice";
import { productCategory } from "../features/category/categorySlice";
import { Colors, singleColor } from "../features/color/colorSlice";
import {
  createProducts,
  editProducts,
  singleProduct,
} from "../features/product/productSlice";
import { deleteImage, imageUpload } from "../features/upload/uploadSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(({ auth }) => auth);
  const { brands } = useSelector(({ brand }) => brand);
  const { productCategories: categories } = useSelector(
    ({ productCategory }) => productCategory
  );
  const { colors } = useSelector(({ color }) => color);
  const { images } = useSelector(({ image }) => image);
  const { isSuccess, isError, products, message } = useSelector(
    ({ product }) => product
  );

  useEffect(() => {
    dispatch(Brands());
    dispatch(productCategory());
    dispatch(Colors());

    if (id) {
      dispatch(singleProduct({ id }));
    }
  }, [dispatch, id]);

  let allColors = colors?.map(item => ({
    value: item._id,
    label: item.title,
  }));
  const [color, setColor] = useState([]);

  useEffect(() => {
    if (products?.color) {
      setColor(products?.color);
    }
  }, [products?.color]);

  let img;
  if (!images.msg) {
    img = images.map(img => ({
      url: img.url,
      public_id: img.public_id,
    }));
  }

  if (products?.images && images.length === 0) {
    img = [...products?.images];
  }

  const formik = useFormik({
    initialValues: {
      title: id ? products.title : "",
      desc: id ? products.desc : "",
      price: id ? products.price : "",
      brand: id ? products.brand : "",
      category: id ? products.category : "",
      tag: id ? products.tag : "",
      quantity: id ? products.quantity : "",
      images: img,
      color: color,
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (id) {
        dispatch(editProducts({ id, token: user.token, data: values }));

        if (isSuccess && (message === "updated" || "single product")) {
          toast.success("Product Updated");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-product");
          }, 500);
        } else if (isError) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(createProducts({ token: user.token, data: values }));

        if (isSuccess && message === "success") {
          toast.success("Product created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-product");
          }, 500);
        } else if (isError) {
          toast.error(message);
        }
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
  // formik.values.color = color;
  // formik.values.images = img;

  console.log({ products, color, colors });
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">
        {id ? "Edit" : "Add"} Product
      </h1>

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
            {/* <ReactQuill
              theme="snow"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
            /> */}
            <textarea
              name="desc"
              id=""
              rows="5"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              placeholder="Product description"
              className="w-full border p-2 rounded-md"
            ></textarea>
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
              {brands?.map(brand => (
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
              {categories?.map(category => (
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
              className="w-full text-black border border-black"
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
              {formik.values?.images?.map(img => (
                <div key={img.asset_id} className="relative">
                  <div
                    className="absolute top-2 right-2 cursor-pointer font-bold"
                    onClick={() => {
                      dispatch(
                        deleteImage({
                          id: img.public_id.split("/")[2],
                          token: user.token,
                        })
                      );

                      img = [];
                    }}
                  >
                    <IoClose />
                  </div>
                  <img src={img.url} alt="" width={200} height={200} />
                </div>
              ))}
            </div>
          )}

          <Button title={id ? "Edit Product" : "Add Product"} />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
