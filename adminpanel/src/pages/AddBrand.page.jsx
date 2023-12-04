import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, CustomInput } from "../components";
import { createBrands, Brand, brandEdit } from "../features/brand/brandSlice";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(({ auth }) => auth);
  const { isSuccess, isError, brands, message } = useSelector(
    ({ brand }) => brand
  );

  useEffect(() => {
    if (id) {
      dispatch(Brand({ id }));
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: id ? brands.title : "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (id) {
        dispatch(brandEdit({ id, token: user.token, data: values }));

        if (isSuccess && (message === "updated" || "single brand")) {
          toast.success("Brand Updated");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-brand");
          }, 3000);
        } else if (isError) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(createBrands({ data: values, token: user.token }));

        if (isSuccess && message === "success") {
          toast.success("Brand created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-brand");
          }, 3000);
        } else if (isError) {
          toast.error(message);
        }
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">
        {id ? "Edit" : "Add"} Brand
      </h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label="Brand"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.title ? "block" : "hidden"
              }`}
            >
              {formik.touched.title && formik.errors.title}
            </p>
          </div>

          <Button title={id ? "Edit Brand" : "Add Brand"} />
        </form>
      </div>
    </>
  );
};

export default AddBrand;
