import { useQuery } from "react-query";
import { OrderInfo } from "../../types/orderTypes";
import { usePrivateApi } from "../auth/usePrivateApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../types/customTypes";
import { toast } from "react-toastify";

export const useGetOrders = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const getOrders = async () => {
		try {
			const response = await eCommerceApiPrivate.get("/api/orders");

			return response.data.sort((a: OrderInfo, b: OrderInfo) => {
				if (a.createdAt! > b.createdAt!) {
					return -1;
				}
				if (a.createdAt! < b.createdAt!) {
					return 1;
				}
				return 0;
			});
		} catch (error) {
			const err = error as CustomError;
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

	return useQuery<OrderInfo[]>("orders", getOrders, {
		retry: false,
	});
};
