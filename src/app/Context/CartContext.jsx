"use client";
import { createContext, useEffect, useState } from "react";

let cartContext = createContext();

export default function CartContext({ children }) {
  let [cart, setcart] = useState([]);

  let obj = {
    cart,
    setcart,
  };
  useEffect(() => {
    let oldCartData = JSON.parse(localStorage.getItem("CART")) ?? [];
    console.log("oldCartData", oldCartData);
    setcart(oldCartData);
  }, []);

  useEffect(() => {
    // console.log("cart", cart);
    if (cart.length > 0) localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  return <cartContext.Provider value={obj}>{children}</cartContext.Provider>;
}
export { cartContext };
