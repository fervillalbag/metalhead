import React, { useEffect } from "react";
import Layout from "@/layout";
import { useCart } from "@/hooks/useCart";
import { getToken } from "utils/helpers";
import { isAuth, isUserNotFound } from "utils/actions";
import useAuth from "@/hooks/useAuth";

const Cart = () => {
  isUserNotFound();

  const { cart } = useCart();
  const { user } = useAuth();

  console.log(cart);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto w-11/12 py-16">
        <span className="block">Cart</span>
      </div>
      {user ? "logueado" : "no logueado"}
    </Layout>
  );
};

export default Cart;
