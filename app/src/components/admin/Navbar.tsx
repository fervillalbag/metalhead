import React from "react";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { MdBusinessCenter, MdOutlinePermMedia } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { BiStore } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";

const NavbarDashboard: React.FC = () => {
  return (
    <div className="w-64 border-r border-r-slate-200 h-screen">
      <div className="py-12 px-8 flex">
        <div className="grid grid-cols-[5px_5px] gap-2">
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
        </div>
      </div>

      <div className="px-8 mt-8">
        <Link href="/">
          <a className="inline-flex items-center mb-10">
            <span className="block mr-6 text-3xl text-slate-700">
              <HiOutlineHome />
            </span>
            <span className="block text-slate-700">Home</span>
          </a>
        </Link>
        <Link href="/admin/about">
          <a className="inline-flex items-center mb-10">
            <span className="block mr-6 text-3xl text-slate-700">
              <MdBusinessCenter />
            </span>
            <span className="block text-slate-700">About</span>
          </a>
        </Link>
        <Link href="/admin/header">
          <a className="inline-flex items-center mb-10">
            <span className="block mr-6 text-3xl text-slate-700">
              <MdOutlinePermMedia />
            </span>
            <span className="block text-slate-700">Header</span>
          </a>
        </Link>
        <Link href="/admin/growth">
          <a className="inline-flex items-center mb-10">
            <span className="block mr-6 text-3xl text-slate-700">
              <GiBrain />
            </span>
            <span className="block text-slate-700">Growth</span>
          </a>
        </Link>
        <Link href="/admin/product">
          <a className="inline-flex items-center mb-10">
            <span className="block mr-6 text-3xl text-slate-700">
              <BiStore />
            </span>
            <span className="block text-slate-700">Products</span>
          </a>
        </Link>
        <Link href="/admin/growth">
          <a className="inline-flex items-center mb-10">
            <span className="block mr-6 text-3xl text-slate-700">
              <ImPriceTags />
            </span>
            <span className="block text-slate-700">Growth</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NavbarDashboard;
