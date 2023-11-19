import React from "react";
import { CustomInput } from "../components";

const ForgetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-32 w-1/4 bg-white rounded-md mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter email to recover password!
          </p>
        </div>

        <form action="">
          <CustomInput
            type="email"
            label="Email Address"
            i_id="email"
            name="email"
          />

          <button
            className="border-0 px-3 py-2 font-bold w-full text-center"
            style={{ background: "#ffd333" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
