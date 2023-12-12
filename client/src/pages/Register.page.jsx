import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { registerUser } from "../feature/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    onSubmit: async values => {
      dispatch(registerUser({ userData: values }));

      if (isSuccess) {
        toast.success("User Created Successfully");
        formik.resetForm();
      } else if (isError) {
        toast.error(message);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  return (
    <>
      <Meta title="Register" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Register" />

        <div className="mt-20 pb-32">
          <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-6 space-y-4">
              <h1 className="text-lg text-center font-semibold">Register</h1>

              <div>
                <form
                  action=""
                  className="space-y-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                    />
                    <p
                      className={`text-red-500 text-xs mb-3 ${
                        formik.errors.firstName ? "block" : "hidden"
                      }`}
                    >
                      {formik.touched.firstName && formik.errors.firstName}
                    </p>
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                    />
                    <p
                      className={`text-red-500 text-xs mb-3 ${
                        formik.errors.lastName ? "block" : "hidden"
                      }`}
                    >
                      {formik.touched.lastName && formik.errors.lastName}
                    </p>
                  </div>

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
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                    />
                    <p
                      className={`text-red-500 text-xs mb-3 ${
                        formik.errors.mobile ? "block" : "hidden"
                      }`}
                    >
                      {formik.touched.mobile && formik.errors.mobile}
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

                  <div className="flex items-center">
                    <p className="text-sm text-gray-500 mt-2">
                      Have an account?{" "}
                      <Link
                        to="/login"
                        className="text-blue-500 font-semibold hover:underline"
                      >
                        Login Now
                      </Link>
                    </p>
                  </div>

                  <Button text="REGISTER" mr />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
