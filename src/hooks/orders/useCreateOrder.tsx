import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderCreation } from "../../types/orderTypes";
import { CustomError } from "../../types/customTypes";
import { toast } from "react-toastify";
import { useOrderContext } from "../context/useOrderContext";
import { useCartContext } from "../context/useCartContext";
import { useNavigate, useLocation } from "react-router-dom";

export const useCreateOrder = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { clearMyOrder } = useOrderContext();
	const { clearMyCart } = useCartContext();
	const navigate = useNavigate();
	const location = useLocation();

	const createOrder = async (myOrder: OrderCreation) => {
		try {
			const response = await eCommerceApiPrivate.post("/api/orders/", myOrder);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.update("deletingOrder", {
					render: "Your session has expired.",
					type: "info",
					isLoading: false,
					autoClose: 1500,
					draggable: true,
					closeOnClick: true,
				});

				navigate("/signin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.update("deletingOrder", {
				render: err.response?.data?.message,
				type: "error",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
			return Promise.reject(error);
		}
	};

	return useMutation(createOrder, {
		onMutate: () => {
			toast.loading("Creating your order...", {
				type: "info",
				toastId: "deletingOrder",
			});
		},
		onSuccess: (data: OrderCreation[]) => {
			queryClient.invalidateQueries("orders");
			clearMyCart();
			clearMyOrder();
			navigate("/");

			toast.update("deletingOrder", {
				render: "Your order has been made.",
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
			console.log(data);
		},
	});
};
