import React from "react";
import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const ResetPassword = () => {
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

              <form action="" className="space-y-4">
                <Input type="password" name="password" placeholder="Password" />
                <Input
                  type="password"
                  name="cfPassword"
                  placeholder="Confirm Password"
                />

                <div className="flex gap-4 items-center">
                  <Button type="submit" text="RESET" mr />
                  <p className="border py-2 px-5 rounded-3xl text-xs cursor-pointer opacity-80 hover:opacity-100 focus:opacity-100">
                    <Link to="/login">CANCEL</Link>
                  </p>
                </div>

                <button>Hello</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
