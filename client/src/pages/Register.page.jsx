import React from "react";
import { BreadCrumb, Input, Meta } from "../components";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const Register = () => {
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
                <form action="" className="space-y-4">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <Input type="text" name="lastName" placeholder="Last Name" />
                  <Input type="email" name="email" placeholder="Email" />
                  <Input type="text" name="mobile" placeholder="Mobile Number" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </form>

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
                <br />

                <Button type="submit" text="CREATE" mr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
