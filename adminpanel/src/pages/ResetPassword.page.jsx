import { CustomInput } from "../components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { resetPass } from "../features/auth/authSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isSuccess, isError, message } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      newPass: "",
      cfPassword: "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (values.newPass !== values.cfPassword) {
        toast.error("password don't match");
      } else {
        dispatch(
          resetPass({
            token,
            data: { password: values.newPass },
          })
        );

        if (isSuccess) {
          toast.success(message);
          formik.resetForm();
          Navigate('/')
        } else if (isError) {
          toast.error(message);
        }
      }
    },
    validationSchema: Yup.object({
      newPass: Yup.string().required("Password is required"),
      cfPassword: Yup.string().required("Confirm Password is required"),
    }),
  });

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-32 w-1/4 bg-white rounded-md mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mt-1">Reset Password</h1>
          <p className="text-sm text-gray-500 mt-1">Enter new password.</p>
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="password"
            label="New Password"
            i_id="newPass"
            name="newPass"
            value={formik.values.newPass}
            onChange={formik.handleChange}
            m
          />
          <CustomInput
            type="password"
            label="Confirm Password"
            i_id="cfPassword"
            name="cfPassword"
            value={formik.values.cfPassword}
            onChange={formik.handleChange}
          />

          <button
            className="border-0 px-3 py-2 font-bold w-full text-center mt-4 cursor-pointer"
            style={{ background: "#ffd333" }}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
