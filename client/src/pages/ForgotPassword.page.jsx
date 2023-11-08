import React from "react";
import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
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

              <form action="" className="space-y-4">
                <Input type="email" name="email" placeholder="Email" />

                <div className="flex gap-4 items-center">
                  <Button type="submit" text="SUBMIT" mr />
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
