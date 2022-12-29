import { useContext } from "react";
import { OrderContext } from "../../context/OrderProvider";

export const useOrderContext = () => {
	return useContext(OrderContext);
};
