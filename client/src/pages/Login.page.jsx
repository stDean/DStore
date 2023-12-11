import React from "react";
import { BreadCrumb, Input, Meta } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../feature/auth/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async values => {
      dispatch(loginUser({ userData: values }));
      formik.resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged In Successful");
      navigate("/");
    } else if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <>
      <Meta title="Login" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Login" />

        <div className="mt-20 pb-32">
          <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-6 space-y-4">
              <h1 className="text-lg text-center font-semibold">Login</h1>

              <div>
                <form
                  action=""
                  className="space-y-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                    />

                    <p
                      className={`text-red-500 text-xs mb-3 ${
                        formik.errors.email ? "block" : "hidden"
                      }`}
                    >
                      {formik.touched.email && formik.errors.email}
                    </p>
                  </div>

                  <div>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                    />

                    <p
                      className={`text-red-500 text-xs mb-3 ${
                        formik.errors.password ? "block" : "hidden"
                      }`}
                    >
                      {formik.touched.password && formik.errors.password}
                    </p>
                  </div>

                  <div className=" flex items-center justify-between">
                    <p className="hover:underline text-sm text-gray-500 mt-2">
                      <Link
                        to="/forgot-password"
                        // className="hover:underline text-sm text-gray-500 mt-2"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-blue-500 font-semibold hover:underline"
                      >
                        Register Now
                      </Link>
                    </p>
                  </div>

                  <Button text="LOGIN" mr />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
