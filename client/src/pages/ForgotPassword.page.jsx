import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { forgotPass } from "../feature/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      console.log(values);
      dispatch(forgotPass({ data: values }));

      if (isSuccess) {
        toast.success("Profile Updated");
        formik.resetForm();
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
    <>
      <Meta title="Forgot Password" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Forgot Password" />

        <div className="mt-20 pb-32">
          <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-6 space-y-4">
              <h1 className="text-lg text-center font-semibold capitalize">
                Enter your email address
              </h1>
              <p className="text-sm text-center text-gray-500">
                An email will be sent to reset your password.
              </p>

              <form
                action=""
                className="space-y-4"
                onSubmit={formik.handleSubmit}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <div className="flex gap-4 items-center">
                  <Button text="SUBMIT" mr />
                  <p className="border py-2 px-5 rounded-3xl text-xs cursor-pointer opacity-80 hover:opacity-100 focus:opacity-100">
                    <Link to="/login">CANCEL</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
