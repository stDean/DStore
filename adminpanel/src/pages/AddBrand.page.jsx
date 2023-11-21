import { Button, CustomInput } from "../components";

const AddBrand = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Brand</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="">
          <CustomInput type="text" label="Brand" name="title" />

          <Button title="Add Brand" />
        </form>
      </div>
    </>
  );
};

export default AddBrand;
