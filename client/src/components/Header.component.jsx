import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState(false);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between py-2 max-w-7xl mx-auto">
        <div>
          <p className="text-white mb-0 text-xs">
            Free Shipping Over $100 & Free Return.
          </p>
        </div>
        <div>
          <p className="text-white mb-0 text-xs">
            Hotline: <Link to="tel:+234 9054545434">+234 9054545434</Link>
          </p>
        </div>
      </div>

      <div className="header-top-strip" />

      <div className="header-upper max-w-7xl mx-auto flex items-center justify-between gap-10 py-3 space-x-6">
        <div className="text-white">
          <div>
            <h2 className="text-white text-3xl">
              <Link to="/">DStores</Link>
            </h2>
          </div>
        </div>

        <div className="relative flex-1 w-full">
          <input
            type="text"
            name="price"
            id="price"
            className="block rounded-tl-md rounded-bl-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="search..."
            style={{
              width: `calc(100% - 40px)`,
            }}
          />
          <span className="absolute right-0 top-0 w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md font-bold upper-text cursor-pointer">
            <BsSearch />
          </span>
        </div>

        <div className="text-white flex-1">
          <div className="header-upper-links flex items-center justify-between">
            <div>
              <Link to="/compare">
                <div className="flex gap-2 items-center">
                  <img src="/images/compare.svg" alt="compare" />
                  <p className="text-white text-sm">
                    Compare <br /> Products
                  </p>
                </div>ButtonLink
              </Link>
            </div>
            <div>
              <Link to="/wishlist">
                <div className="flex gap-2 items-center">
                  <img src="/images/wishlist.svg" alt="wishlist" />
                  <p className="text-white text-sm">
                    Favorite <br /> Wishlists
                  </p>
                </div>
              </Link>
            </div>
            <div className="group relative">
              <div className="flex gap-2 items-center">
                <img src="/images/user.svg" alt="user" />
                <p className="text-white text-sm">
                  Log In <br /> My Account
                </p>
              </div>

              <div className="hidden group-hover:block w-full text-black text-sm rounded-md bg-gray-100 font-semibold absolute px-4 py-2 ">
                <Link
                  to="/login"
                  className="border-b border-blue-300 w-full pb-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="pt-2"
                >
                  Register
                </Link>
              </div>
            </div>
            <div>
              <Link to="/cart" className="flex gap-3 items-center">
                <img src="/images/cart.svg" alt="cart" />
                <div className="text-center ">
                  <span className="bg-white px-2 text-black text-xs rounded -mb-1">
                    0
                  </span>
                  <br />
                  <span className="text-xs block">$0.00</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="flex items-center py-1 max-w-7xl mx-auto">
          <div class="relative inline-block text-left w-64">
            <div className="flex items-center">
              <button
                type="button"
                class="inline-flex w-full justify-center gap-x-1.5 bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 outline-none border-r"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setMenu(menu => !menu)}
              >
                <img
                  src="/images/menu.svg"
                  alt="menu"
                  width={25}
                  height={25}
                  className="mr-2"
                />

                <span className="text-white">SHOW CATEGORIES</span>

                <svg
                  className="-mr-1 h-5 w-5 text-white ml-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {menu && (
              <div
                class="absolute -right-25 z-10 mt-2 w-full origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown__menu"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <Link
                    to="/"
                    class="text-white hover:opacity-90 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                  >
                    Account settings
                  </Link>
                  <Link
                    to="/"
                    class="text-white hover:opacity-90 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                  >
                    Support
                  </Link>
                  <Link
                    to="/"
                    class="text-white hover:opacity-90 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2"
                  >
                    License
                  </Link>
                  <form method="POST" action="/" role="none">
                    <button
                      type="submit"
                      class="text-white hover:opacity-90 block w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-3"
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="ml-4 flex item-center space-x-4 menu-links">
            <NavLink to="/" className="">
              HOME
            </NavLink>
            <NavLink to="/store" className="">
              OUR STORE
            </NavLink>
            <NavLink to="/blogs" className="">
              BLOG
            </NavLink>
            <NavLink to="/contact" className="">
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
