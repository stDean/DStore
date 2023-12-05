import { useFormik } from "formik";
import { Button, CustomInput } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  createCoupons,
  editCoupons,
  singleCoupon,
} from "../features/coupon/couponSlice";
import { useEffect } from "react";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(({ auth }) => auth);
  const { isError, isSuccess, coupons, message } = useSelector(
    ({ coupon }) => coupon
  );

  const changeDateFormat = ({ date }) => {
    const newDate = new Date(date).toLocaleDateString();
    const [day, month, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (id) {
      dispatch(singleCoupon({ id, token: user.token }));
    }
  }, [dispatch, id, user.token]);

  const formik = useFormik({
    initialValues: {
      name: id ? coupons.name : "",
      expiry: id ? changeDateFormat({ date: coupons.expiry }) : "",
      discount: id ? coupons.discount : "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (id) {
        dispatch(editCoupons({ id, token: user.token, data: values }));

        if (isSuccess && (message === "updated" || "single coupon")) {
          toast.success("Coupon Updated");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/coupon-list");
          }, 500);
        } else if (isError) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(createCoupons({ data: values, token: user.token }));

        if (isSuccess && message === "success") {
          toast.success("Coupon created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/coupon-list");
          }, 500);
        } else if (isError) {
          toast.error(message);
        }
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Title is required"),
      expiry: Yup.date().required("Expiry date is required"),
      discount: Yup.number().required("Title is required"),
    }),
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">
        {id ? "Edit" : "Add"} Coupon
      </h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <CustomInput
              type="text"
              label="Coupon"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.name ? "block" : "hidden"
              }`}
            >
              {formik.touched.name && formik.errors.name}
            </p>
          </div>

          <div>
            <CustomInput
              type="date"
              label="Expiry"
              name="expiry"
              value={formik.values.expiry}
              onChange={formik.handleChange}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.expiry ? "block" : "hidden"
              }`}
            >
              {formik.touched.expiry && formik.errors.expiry}
            </p>
          </div>

          <div>
            <CustomInput
              type="number"
              label="Discount"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.discount ? "block" : "hidden"
              }`}
            >
              {formik.touched.discount && formik.errors.discount}
            </p>
          </div>

          <Button title={id ? "Edit Coupon" : "Add Coupon"} />
        </form>
      </div>
    </>
  );
};

export default AddCoupon;
