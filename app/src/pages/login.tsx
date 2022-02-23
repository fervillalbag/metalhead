import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { LOGIN } from "@/graphql/mutation/login";
import useAuth from "@/hooks/useAuth";
import { isAuth } from "utils/actions";
import { getToken } from "utils/helpers";

const Login: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const [loginMutation] = useMutation(LOGIN);

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

  const handleLogin = async () => {
    try {
      const response = await loginMutation({
        variables: {
          input: userValue,
        },
      });

      if (!response?.data?.login?.token) {
        toast.error("Hubo un error al iniciar sesión");
        return;
      }

      toast.success("Sesión iniciado correctamente");
      login(response?.data?.login?.token);
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
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
      <div className="flex flex-col h-[calc(100vh_-_96px)] justify-center w-11/12 sm:w-9/12 mx-auto">
        <div className="flex justify-center mb-4">
          <div>
            <img src="/logo.svg" alt="" />
          </div>
        </div>
        <span className="block text-2xl text-center text-DarkGrayishBlue">
          Login
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
              value={userValue?.email}
              onChange={(e) =>
                setUserValue({ ...userValue, email: e.target.value })
              }
              placeholder="Email address"
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
          <div>
            <button
              className="py-3 bg-DarkBlue w-full block text-white rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <span className="block mt-4 text-center">
            Do not you have an account yet?{" "}
            <Link href="/register">
              <a className="text-BrightRed">Register</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
