import React from "react";
import {
  Banner,
  BlogCard,
  Collection,
  Hero,
  Meta,
  MiniShop,
  PopularProducts,
  Products,
  SpecialProducts,
} from "../components";
import { bannerItem, hero, miniShop, brand } from "../utils/data";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const {
    blogs: { blogs },
  } = useSelector(({ blog }) => blog);
  const {
    products: { products },
  } = useSelector(({ product }) => product);

  return (
    <>
      <Meta title="Home" />
      {/* Banner */}
      <section className="home-wrapper py-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-rows-2 grid-cols-4 gap-5">
          {bannerItem.map(item => (
            <Banner
              key={item.title}
              amtText={item.antText}
              headText={item.headText}
              moText={item.moText}
              title={item.title}
              imgPath={item.imgPath}
              className={item.class}
              button={item.button}
              small={item.small}
            />
          ))}
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-10 bottom-section">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="flex items-center justify-around">
            {hero.map(({ title, imgPath, subtitle }) => (
              <Hero
                key={title}
                imgPath={imgPath}
                title={title}
                subtitle={subtitle}
              />
            ))}
          </div>

          {/* Mini Shop */}
          <div className="shadow-lg mt-10 rounded-md bg-white grid">
            <div className="grid grid-cols-8 grid-rows-2 my-2 mx-6">
              {miniShop.map(({ title, imgPath, subtitle }) => (
                <MiniShop
                  key={title}
                  title={title}
                  subtitle={subtitle}
                  imgPath={imgPath}
                />
              ))}
            </div>
          </div>

          {/* Featured Collection */}
          <div className="grid grid-cols-12 gap-3 mt-10">
            <div className="col-span-12 text-xl font-semibold">
              <h1>Featured Collection</h1>
            </div>
            {products
              ?.map(
                item =>
                  item.tag === "featured" && (
                    <Collection key={item._id} item={item} />
                  )
              )
              .filter(v => v)
              .filter((_, i) => i <= 5)}
          </div>

          <div className="grid grid-cols-12 gap-3 mt-10">
            <Products bg />
            <Products>
              <img src="/images/laptop.jpg" alt="" className="w-full" />
            </Products>
            <Products>
              <img src="/images/tab1.jpg" alt="" className="w-full" />
            </Products>
            <Products>
              <img src="/images/speaker.jpg" alt="" className="w-full" />
            </Products>
          </div>

          {/* Special Collection */}
          <div className="grid grid-cols-12 gap-3 mt-10">
            <div className="col-span-12 text-xl font-semibold">
              <h1>Special Products</h1>
            </div>

            {products
              ?.map(
                item =>
                  item.tag === "special" && (
                    <SpecialProducts key={item._id} item={item} />
                  )
              )
              .filter(v => v)
              .filter((_, i) => i <= 5)}
          </div>

          {/* Popular Products */}
          <div className="grid grid-cols-12 gap-3 mt-10">
            <div className="col-span-12 text-xl font-semibold">
              <h1>Our Popular Products</h1>
            </div>

            <PopularProducts />
            <PopularProducts bg />
            {products
              ?.map(
                item =>
                  item.tag === "popular" && (
                    <Collection key={item._id} item={item} />
                  )
              )
              .filter(v => v)
              .filter((_, i) => i <= 3)}
          </div>

          {/* Marquee */}
          <div className="shadow-lg mt-10 rounded-md bg-white px-2">
            <Marquee>
              <div className="flex space-x-8 section_marquee">
                {brand.map(img => (
                  <img src={img} key={img} alt="" />
                ))}
              </div>
            </Marquee>
          </div>

          {/* Blog */}
          <div className="grid grid-cols-12 mt-10 gap-3">
            <div className="col-span-12 text-xl font-semibold">
              <h1>Our Latest News</h1>
            </div>
            {blogs
              ?.filter((_, i) => i <= 4)
              ?.map(item => (
                <BlogCard key={item._id} item={item} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
