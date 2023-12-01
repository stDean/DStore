import { useFormik } from "formik";
import { Button, CustomInput } from "../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createCoupons } from "../features/coupon/couponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { isError, isSuccess } = useSelector(({ coupon }) => coupon);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    onSubmit: async values => {
      dispatch(createCoupons({ data: values, token: user.token }));
      if (isSuccess) {
        toast.success("Coupon created successfully");
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/coupon-list");
        }, 3000);
      } else if (isError) {
        toast.error("Something went wrong");
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
      <h1 className="mb-6 text-3xl font-semibold">Add Coupon</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <CustomInput
              type="text"
              label="Coupon"
              name="name"
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

          <Button title="Add Coupon" />
        </form>
      </div>
    </>
  );
};

export default AddCoupon;
