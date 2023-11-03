import React from "react";
import { Banner, Hero, MiniShop } from "../components";
import { bannerItem, hero, miniShop } from "../utils/data";

const Home = () => {
  return (
    <>
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
        </div>
      </section>
    </>
  );
};

export default Home;
