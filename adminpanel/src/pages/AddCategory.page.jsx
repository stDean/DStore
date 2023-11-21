import { Button, CustomInput } from "../components";

const AddCategory = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Category</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="">
          <CustomInput type="text" label="Category" name="title" />

          <Button title="Add Category" />
        </form>
      </div>
    </>
  );
};

export default AddCategory;
