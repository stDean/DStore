import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { resetPass } from "../feature/auth/authSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const { isSuccess, isError, message } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      password: "",
      cfPassword: "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (values.password !== values.cfPassword) {
        toast.error("password don't match");
      } else {
        dispatch(
          resetPass({
            token,
            data: { password: values.password },
          })
        );

        if (isSuccess) {
          toast.success(message);
          formik.resetForm();
        } else if (isError) {
          toast.error(message);
        }
      }
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      cfPassword: Yup.string().required("Confirm Password is required"),
    }),
  });

  return (
    <>
      <Meta title="Reset Password" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Reset Password" />

        <div className="mt-20 pb-32">
          <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-6 space-y-4">
              <h1 className="text-lg text-center font-semibold capitalize">
                Reset Password
              </h1>

              <form
                action=""
                className="space-y-4"
                onSubmit={formik.handleSubmit}
              >
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <Input
                  type="password"
                  name="cfPassword"
                  placeholder="Confirm Password"
                  value={formik.values.cfPassword}
                  onChange={formik.handleChange}
                />

                <div className="flex gap-4 items-center">
                  <Button type="submit" text="RESET" mr />
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

export default ResetPassword;
