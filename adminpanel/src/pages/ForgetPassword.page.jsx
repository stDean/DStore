import { CustomInput } from "../components";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPass } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      dispatch(forgotPass({ data: values }));

      if (isSuccess) {
        toast.success(message);
        formik.resetForm();
        navigate("/");
      } else if (isError) {
        toast.error(message);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
    }),
  });

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-32 w-1/4 bg-white rounded-md mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter email to recover password!
          </p>
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            label="Email Address"
            i_id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <p
            className={`text-red-500 text-xs ${
              formik.errors.email ? "block" : "hidden"
            }`}
          >
            {formik.touched.email && formik.errors.email}
          </p>

          <button
            className="border-0 px-3 py-2 font-bold w-full text-center mt-4 cursor-pointer"
            style={{ background: "#ffd333" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
