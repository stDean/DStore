import { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { CustomInput } from "../components";
import { useLoginMutation } from "../app/api";

const Login = () => {
  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();
  const navigate = useNavigate();

  if (isLoading) {
    console.log("loading...");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async values => {
      const user = await login(values);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user.data?.findAdmin));
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  useEffect(() => {
    if (data && isSuccess) {
      navigate("/admin");
    } else if (error) {
      alert(error?.data.msg);
    }
  }, [isSuccess, data, error]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-32 w-1/4 bg-white rounded-md mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mt-1">Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Login to your account to continue.
          </p>
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            label="Email Address"
            i_id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="text-xs text-red-500 -mt-2">
              {formik.errors.email}
            </div>
          ) : null}

          <CustomInput
            type="password"
            label="Password"
            i_id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="text-xs text-red-500 -mt-2">
              {formik.errors.password}
            </div>
          ) : null}

          <div className="text-xs text-gray-500 -mt-2 mb-2 hover:underline hover:underline-offset-2 hover:text-blue-500 float-right">
            <Link to="/forget">Forget Password?</Link>
          </div>

          <div className="clear-both" />

          <button
            type="submit"
            // to="/admin"
            className="border-0 px-3 py-2 font-bold w-full block text-center"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
