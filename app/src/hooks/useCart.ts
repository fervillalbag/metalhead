import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";

import toast from "react-hot-toast";

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const cartFromStoraget = JSON.parse(
      localStorage.getItem("cart-product") || "[]"
    );
    setCart(cartFromStoraget);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart-product", JSON.stringify(cart));
  }, [cart]);

  const handleAddCart = (item: any) => {
    setCart([...cart, item]);
    toast.success("Agregado al carrito");
  };

  const handleDeleteCart = (id: string) => {
    setCart((currentCart: any) => currentCart.filter((x: any) => x.id !== id));
  };

  return {
    cart,
    handleAddCart,
    handleDeleteCart,
  };
};
