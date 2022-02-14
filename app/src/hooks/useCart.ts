import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";

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
    const exist = cart.find((x: any) => x.id === item.id);
    if (exist) {
      setCart(
        cart.map((x: any) =>
          x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const handleDeleteCart = (item: any) => {
    const exist = cart.find((x: any) => x.id === item.id);

    if (!exist) {
      return;
    }

    if (exist.qty === 1) {
      setCart(cart.filter((x: any) => x.id !== item.id));
    } else {
      setCart(
        cart.map((x: any) =>
          x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const handleDeleteAllProductCart = (id: string) => {
    setCart(cart.filter((x: any) => x.id !== id));
  };

  return {
    cart,
    handleAddCart,
    handleDeleteCart,
    handleDeleteAllProductCart,
  };
};
