import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-VeryDarkBlue">
      <div className="max-w-6xl w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-[300px_1fr_340px] gap-x-10 gap-y-10 lg:gap-y-0 grid-rows-[auto_auto]">
        <div className="order-4 md:order-none mx-auto md:mx-0">
          <img src="/logo-white.svg" alt="" />
        </div>

        <div className="order-2 px-4 justify-items-center md:justify-items-start grid grid-cols-2 justify-center lg:col-start-2 lg:row-start-1 row-end-3">
          <div className="">
            <Link href="/">
              <a className="block text-white mb-4 text-center lg:text-left">
                Home
              </a>
            </Link>
            <Link href="/">
              <a className="block text-white mb-4 text-center lg:text-left">
                Pricing
              </a>
            </Link>
            <Link href="/">
              <a className="block text-white mb-4 text-center lg:text-left">
                Products
              </a>
            </Link>
            <Link href="/">
              <a className="block text-white">About Us</a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a className="block text-white mb-4 text-center lg:text-left">
                Careers
              </a>
            </Link>
            <Link href="/">
              <a className="block text-white mb-4 text-center lg:text-left">
                Community
              </a>
            </Link>
            <Link href="/">
              <a className="block text-white mb-4 text-center lg:text-left">
                Privacy Policy
              </a>
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-none">
          <div className="flex">
            <input
              type="text"
              className="block text-sm w-full py-2 px-5 outline-none rounded-3xl border-none"
              placeholder="Updates in your box.."
            />
            <button className="block ml-3 bg-BrightRed px-6 py-3 rounded-3xl text-white text-sm font-medium">
              Go
            </button>
          </div>
        </div>
        <div className="order-3 md:order-none flex justify-center md:justify-start lg:items-end -ml-2 lg:col-start-1 lg:col-end-2">
          <Link href="/">
            <a className="block p-2">
              <img src="/icon-facebook.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="block p-2">
              <img src="/icon-youtube.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="block p-2">
              <img src="/icon-twitter.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="block p-2">
              <img src="/icon-pinterest.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="block p-2">
              <img src="/icon-instagram.svg" alt="" />
            </a>
          </Link>
        </div>

        <div className="order-5 md:order-none lg:col-start-3 lg:col-end-4 flex justify-center lg:justify-end items-end">
          <span className="block text-DarkGrayishBlue">
            Copyright 2020. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
