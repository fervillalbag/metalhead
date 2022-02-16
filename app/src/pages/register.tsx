import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Register: React.FC = () => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 h-screen sm:overflow-y-hidden">
      <div className="lg:col-start-1 lg:col-end-3 h-24 sm:h-screen">
        <LazyLoadImage
          src="/auth-image.jpeg"
          alt=""
          className="w-screen h-24 sm:h-screen object-cover"
          effect="blur"
        />
      </div>
      <div className="flex flex-col py-10 justify-center w-11/12 sm:w-9/12 mx-auto">
        <div className="flex justify-center mb-4">
          <div>
            <img src="/logo.svg" alt="" />
          </div>
        </div>
        <span className="block text-2xl text-center text-DarkGrayishBlue">
          Register
        </span>
        <span className="block text-center mt-2 text-DarkGrayishBlue text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a
          metus eu libero tristique sodales.
        </span>

        <div className="mt-6">
          <div className="mb-4">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              // value={data?.title}
              // onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Name"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              // value={data?.title}
              // onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Last name"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              // value={data?.title}
              // onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Email address"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              // value={data?.title}
              // onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              // value={data?.title}
              // onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              // value={data?.title}
              // onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Confirm password"
            />
          </div>
          <div>
            <button className="py-3 bg-DarkBlue w-full block text-white rounded">
              Register
            </button>
          </div>
          <span className="block mt-4 text-center">
            Do you already have an account?{" "}
            <Link href="/login">
              <a className="text-BrightRed">Login</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
