import { Button, CustomInput } from "../components";

const AddCoupon = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Coupon</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="">
          <CustomInput type="text" label="Coupon" name="title" />

          <Button title="Add Coupon" />
        </form>
      </div>
    </>
  );
};

export default AddCoupon;
