import { Button, CustomInput } from "../components";

const AddBlogCategory = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Blog Category</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="">
          <CustomInput type="text" label="Blog Category" name="title" />

          <Button title="Add Blog Category" />
        </form>
      </div>
    </>
  );
};

export default AddBlogCategory;
