import { useContext } from "react";
import CartContext from "../store/CartContext";

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export default useCart;
