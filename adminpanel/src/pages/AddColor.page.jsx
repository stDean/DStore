import { Button } from "../components";

const AddColor = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Color</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" className="flex flex-col">
          <label htmlFor="color" className="flex flex-col">
            <span className="text-sm">Choose a color</span>
            <input
              type="color"
              name="color"
              id="color"
              className="w-full"
            />
          </label>

          <Button title="Add Color" />
        </form>
      </div>
    </>
  );
};

export default AddColor;
