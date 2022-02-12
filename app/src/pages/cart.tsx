import React from "react";
import Layout from "@/layout";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { cart } = useCart();
  console.log(cart);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto w-11/12 py-16">
        <span className="block">Cart</span>
      </div>
    </Layout>
  );
};

export default Cart;
