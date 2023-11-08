import React from "react";
import { BreadCrumb, Input, Meta } from "../components";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const Login = () => {
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
                <form action="" className="space-y-4">
                  <Input type="email" name="email" placeholder="Email" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </form>

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
                <br />

                <Button type="submit" text="LOGIN" mr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
