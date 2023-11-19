import { Link } from "react-router-dom";
import { CustomInput } from "../components";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-32 w-1/4 bg-white rounded-md mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mt-1">Login</h1>
          <p className="text-sm text-gray-500">
            Login to your account to continue.
          </p>
        </div>

        <form action="">
          <CustomInput
            type="email"
            label="Email Address"
            i_id="email"
            name="email"
          />
          <CustomInput
            type="password"
            label="Password"
            i_id="password"
            name="password"
          />

          <Link
            to="/admin"
            className="border-0 px-3 py-2 font-bold w-full block text-center"
            style={{ background: "#ffd333" }}
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
