import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaTimes, FaBars } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
  const router = useRouter();

  const handleOpenMenu = () => setIsMenuShow(true);
  const handleCloseMenu = () => setIsMenuShow(false);

  return (
    <nav className="sticky top-0 lg:static max-w-6xl w-11/12 mx-auto flex justify-between py-8 items-center">
      <div>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="" />
          </a>
        </Link>
      </div>

      <button
        className="block lg:hidden p-4 text-2xl text-VeryDarkBlue"
        onClick={handleOpenMenu}
      >
        <FaBars />
      </button>

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

      <div className="hidden lg:block">
        <Link href="/">
          <a className="bg-BrightRed inline-block text-VeryPaleRed py-3 px-8 rounded-full text-sm font-medium">
            Get Started
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
