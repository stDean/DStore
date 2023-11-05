import { BreadCrumb, MainStore, Meta, SideBar } from "../components";

const Store = () => {
  return (
    <>
      <Meta title="Our Store" />
      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Our Store" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 grid grid-cols-12 gap-5">
          <SideBar />
          <MainStore />
        </div>
      </div>
    </>
  );
};

export default Store;
