import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { FaTimes, FaBars, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "@/context/CartContext";
import { CartContextModal } from "@/context/CartContextModal";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const { setIsShowModalCart } = useContext(CartContextModal);

  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);

  const handleOpenMenu = () => setIsMenuShow(true);
  const handleCloseMenu = () => setIsMenuShow(false);

  return (
    <nav className="sticky top-0 lg:static max-w-6xl w-11/12 mx-auto flex justify-between py-8 items-center">
      <div>
        <Link href="/">
          <a>
            <LazyLoadImage src="/logo.svg" placeholderSrc="/logo.svg" alt="" />
          </a>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="lg:hidden mr-5">
          <button
            className="text-3xl text-VeryDarkBlue relative"
            onClick={() => setIsShowModalCart(true)}
          >
            <span>
              <FaShoppingCart />
            </span>
            <span className="text-xs absolute bg-BrightRed text-white w-6 h-6 rounded-full flex items-center justify-center bottom-[-16px] right-[-10px]">
              {!cart.length ? 0 : cart.length}
            </span>
          </button>
        </div>

        <button
          className="block lg:hidden p-4 text-2xl text-VeryDarkBlue"
          onClick={handleOpenMenu}
        >
          <FaBars />
        </button>
      </div>

      <div
        className={`${
          isMenuShow ? "translate-y-0" : "translate-y-[-2000px]"
        } lg:translate-y-0 fixed left-0 top-0 bg-white md:bg-transparent w-screen h-full lg:w-auto lg:h-auto lg:static lg:flex flex-col lg:flex-row items-center justify-center z-[2000]`}
      >
        <div className="flex flex-col lg:flex-row w-full h-full items-center justify-center relative z-[2000]">
          <button
            className="block lg:hidden absolute right-4 top-8 text-2xl text-VeryDarkBlue p-4"
            onClick={handleCloseMenu}
          >
            <FaTimes />
          </button>

          <Link href="/">
            <a
              className={`block text-2xl lg:text-base mb-6 lg:mb-0 mr-0 lg:mr-8 ${
                router.pathname === "/" ? "text-BrightRed" : "text-VeryDarkBlue"
              }`}
            >
              Home
            </a>
          </Link>
          <Link href="/products">
            <a
              className={`block text-2xl lg:text-base mb-6 lg:mb-0 mr-0 lg:mr-8 ${
                router.pathname === "/products"
                  ? "text-BrightRed"
                  : "text-VeryDarkBlue"
              }`}
            >
              Product
            </a>
          </Link>
          <Link href="/about">
            <a
              className={`block text-2xl lg:text-base mb-6 lg:mb-0 mr-0 lg:mr-8 ${
                router.pathname === "/about"
                  ? "text-BrightRed"
                  : "text-VeryDarkBlue"
              }`}
            >
              About Us
            </a>
          </Link>
          <Link href="/plans">
            <a
              className={`block text-2xl lg:text-base mb-6 lg:mb-0 mr-0 lg:mr-8 ${
                router.pathname === "/plans"
                  ? "text-BrightRed"
                  : "text-VeryDarkBlue"
              }`}
            >
              Plans
            </a>
          </Link>
          <Link href="/">
            <a
              className={`block text-2xl lg:text-base mb-6 lg:mb-0 mr-0 lg:mr-8 ${
                router.pathname === "/community"
                  ? "text-BrightRed"
                  : "text-VeryDarkBlue"
              }`}
            >
              Community
            </a>
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex items-center">
        <Link href="/">
          <a className="bg-BrightRed inline-block text-VeryPaleRed py-3 px-8 rounded-full text-sm font-medium">
            Get Started
          </a>
        </Link>
        <div className="ml-4">
          <button
            className="text-3xl text-VeryDarkBlue relative"
            onClick={() => setIsShowModalCart(true)}
          >
            <span>
              <FaShoppingCart />
            </span>
            <span className="text-xs absolute bg-BrightRed text-white w-6 h-6 rounded-full flex items-center justify-center bottom-[-16px] right-[-10px]">
              {!cart.length ? 0 : cart.length}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
