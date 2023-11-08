import React from "react";
import { BsFacebook, BsInstagram, BsSnapchat, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full text-white">
      <div className="footer-upper max-w-5xl mx-auto flex items-center justify-between py-10">
        <div className="font-semibold tracking-wide flex items-center space-x-3">
          <img src="images/newsletter.png" alt="newsletter" />
          <p>Sign Up For Newsletter</p>
        </div>

        <div
          className=" bg-white pl-4 py-2 flex items-center relative rounded-md"
          style={{ width: "55%" }}
        >
          <input
            type="email"
            name="email"
            id=""
            placeholder="Your Email"
            className="bg-transparent outline-none border-none text-sm tracking-wide text-black"
            style={{
              width: "82%",
            }}
          />
          <button
            className="text-xs absolute right-2 px-2 rounded-md sub-btn hover:opacity-90"
            style={{ paddingTop: "6px", paddingBottom: "6px" }}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>

      <div className="footer-mid py-10">
        <div className="grid grid-cols-12 mx-20">
          <div className="flex flex-col justify-around gap-4 col-span-3">
            <h2 className="font-semibold mb-2">Contact Us</h2>
            <div className="text-xs">
              <p>DStores</p>
              <p>No.2 Adefolu Dr., Ikeja, Lagos.</p>
              <p>Nigeria.</p>
            </div>
            <a
              href="tel: +234 9054545434"
              className="text-sm hover:font-semibold"
            >
              +234 9054545434
            </a>
            <a
              href="mailto: dstores@gmail.com"
              className="text-sm hover:font-semibold"
            >
              dstores@gmail.com
            </a>
            <div className="space-x-2 mt-2 socials">
              <Link className="bg-green-500 p-3 rounded-full">
                <BsInstagram />
              </Link>
              <Link className="bg-green-500 p-3 rounded-full">
                <BsSnapchat />
              </Link>
              <Link className="bg-green-500 p-3 rounded-full">
                <BsFacebook />
              </Link>
              <Link className="bg-green-500 p-3 rounded-full">
                <BsYoutube />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-around gap-4 col-span-2">
            <h2 className="font-semibold mb-2">Information</h2>
            <Link to="/privacy" className="text-xs hover:font-semibold">
              Privacy Policy
            </Link>
            <Link to="/refund" className="text-xs hover:font-semibold">
              Refund Policy
            </Link>
            <Link to="/shipping" className="text-xs hover:font-semibold">
              Shipping Policy
            </Link>
            <Link to="/terms&condition" className="text-xs hover:font-semibold">
              Terms Of Service
            </Link>
            <Link className="text-xs hover:font-semibold">Blogs</Link>
          </div>

          <div className="flex flex-col justify-around gap-4 col-span-2">
            <h2 className="font-semibold mb-2">Account</h2>
            <Link className="text-xs hover:font-semibold">Search</Link>
            <Link className="text-xs hover:font-semibold">About Us</Link>
            <Link className="text-xs hover:font-semibold">FAQ</Link>
            <Link className="text-xs hover:font-semibold">Contact</Link>
            <Link className="text-xs hover:font-semibold">Size Chart</Link>
          </div>

          <div className="flex flex-col justify-around gap-4 col-span-2">
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <Link className="text-xs hover:font-semibold">Accessories</Link>
            <Link className="text-xs hover:font-semibold">Laptops</Link>
            <Link className="text-xs hover:font-semibold">Headphones</Link>
            <Link className="text-xs hover:font-semibold">Smart Watches</Link>
            <Link className="text-xs hover:font-semibold">Tablets</Link>
          </div>

          <div className="flex flex-col gap-4 col-span-3">
            <h2 className="font-semibold mb-2">Our App</h2>
            <p className="text-xs">
              Download our app and get extra 15% discount on your first order!
            </p>
            <div></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom py-4 flex items-center justify-center mx-20">
        <p>@2023. DStores Powered By Shopify</p>
      </div>
    </footer>
  );
};

export default Footer;
