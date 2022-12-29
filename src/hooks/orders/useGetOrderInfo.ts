import { useQuery } from "react-query";
import { usePrivateApi } from "../auth/usePrivateApi";
import { OrderInfo } from "../../interfaces/orderInterface";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useGetOrderInfo = (orderId: string) => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const getOrderInfo = async (orderId: string) => {
		try {
			const response = await eCommerceApiPrivate.get(`/api/orders/${orderId}`);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 404 || !orderId) {
				navigate("/orders");
				toast.error("This order could not be found.");
				return Promise.reject(error);
			}

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/signin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<OrderInfo>(
		[`order-${orderId}`, orderId],
		() => getOrderInfo(orderId!),
		{
			retry: false,
			enabled: !!orderId,
		}
	);
};
