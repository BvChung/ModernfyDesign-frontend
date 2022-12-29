import { useContext } from "react";
import CartContext from "../../context/CartProvider";

export const useCartContext = () => {
	return useContext(CartContext);
};
