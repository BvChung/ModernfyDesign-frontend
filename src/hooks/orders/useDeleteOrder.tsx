import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useDeleteOrder = (orderId: string) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const deleteOrder = async () => {
		try {
			const response = await eCommerceApiPrivate.delete(
				`/api/orders/${orderId}`
			);
			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 404 || !orderId) {
				navigate("/orders");
				toast.update("deletingOrder", {
					render: "This order could not be found.",
					type: "error",
					isLoading: false,
					autoClose: 1500,
					draggable: true,
					closeOnClick: true,
				});
				return Promise.reject(error);
			}

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

	return useMutation(deleteOrder, {
		onMutate: () => {
			toast.loading("Deleting this order...", {
				type: "info",
				toastId: "deletingOrder",
			});
		},
		onSuccess: (data: OrderInfo) => {
			queryClient.invalidateQueries("orders");

			toast.update("deletingOrder", {
				render: `Order number: ${data._id} has been deleted.`,
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});

			navigate("/orders");
		},
	});
};
