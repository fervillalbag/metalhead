import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";

import useAuth from "@/hooks/useAuth";
import { CREATE_USER } from "@/graphql/mutation/register";
import { isAuth, isUserNotFound } from "utils/actions";
import { getToken } from "utils/helpers";

const Register: React.FC = () => {
  const [createUser] = useMutation(CREATE_USER);
  const router = useRouter();
  const { user } = useAuth();
  isUserNotFound();

  const [userValue, setUserValue] = useState({
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        router.push("/");
      }
    })();
  }, [user]);

  const handleCreateUser = async () => {
    try {
      const response = await createUser({
        variables: {
          input: {
            name: userValue.name,
            lastname: userValue.lastname,
            email: userValue.email,
            username: userValue.username,
            password: userValue.password,
          },
        },
      });

      if (!response?.data?.createUser?.success) {
        toast.error(response?.data?.createUser?.message);
        return;
      }

      toast.success(response?.data?.createUser?.message);
    } catch (error) {
      console.log(error);
    }
    console.log(userValue);
  };

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
              value={userValue?.name}
              onChange={(e) =>
                setUserValue({ ...userValue, name: e.target.value })
              }
              placeholder="Name"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              value={userValue?.lastname}
              onChange={(e) =>
                setUserValue({ ...userValue, lastname: e.target.value })
              }
              placeholder="Last name"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              value={userValue?.email}
              onChange={(e) =>
                setUserValue({ ...userValue, email: e.target.value })
              }
              placeholder="Email address"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              value={userValue?.username}
              onChange={(e) =>
                setUserValue({ ...userValue, username: e.target.value })
              }
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              value={userValue?.password}
              onChange={(e) =>
                setUserValue({ ...userValue, password: e.target.value })
              }
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              value={userValue?.confirmPassword}
              onChange={(e) =>
                setUserValue({ ...userValue, confirmPassword: e.target.value })
              }
              placeholder="Confirm password"
            />
          </div>
          <div>
            <button
              onClick={handleCreateUser}
              className="py-3 bg-DarkBlue w-full block text-white rounded"
            >
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
