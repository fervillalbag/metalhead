import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { GoCommentDiscussion } from "react-icons/go";
import { MdBusinessCenter, MdOutlinePermMedia } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { BiStore } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";

const NavbarDashboard: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-80 h-screen overflow-y-auto no-scrollbar border-r border-r-slate-200">
      <div className="py-12 px-8 flex">
        <div className="grid grid-cols-[5px_5px] gap-2">
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
          <div className="w-[5px] h-[5px] bg-DarkGrayishBlue"></div>
        </div>
      </div>

      <div className="flex justify-center px-8 flex-col mt-8">
        <Link href="/admin">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <HiOutlineHome />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              Home
            </span>
          </a>
        </Link>
        <Link href="/admin/about">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin/about"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <MdBusinessCenter />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin/about"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              About
            </span>
          </a>
        </Link>
        <Link href="/admin/header">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin/header"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <MdOutlinePermMedia />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin/header"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              Header
            </span>
          </a>
        </Link>
        <Link href="/admin/growth">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin/growth"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <GiBrain />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin/growth"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              Growth
            </span>
          </a>
        </Link>
        <Link href="/admin/review">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin/review"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <GoCommentDiscussion />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin/review"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              Review
            </span>
          </a>
        </Link>
        <Link href="/admin/product">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin/product"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <BiStore />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin/product"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              Products
            </span>
          </a>
        </Link>
        <Link href="/admin/plan">
          <a className="inline-flex items-center mb-10">
            <span
              className={`block mr-6 text-3xl ${
                router.pathname === "/admin/plan"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              <ImPriceTags />
            </span>
            <span
              className={`block ${
                router.pathname === "/admin/plan"
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              Plan
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NavbarDashboard;
