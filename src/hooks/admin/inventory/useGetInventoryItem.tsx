import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductInfo } from "../../../interfaces/productInterface";
import { usePrivateApi } from "../../auth/usePrivateApi";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useGetInventoryItem = (productId: string) => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const getInventoryItem = async (productId: string) => {
		try {
			const response = await eCommerceApiPrivate.get(
				`/api/admin/inventory/${productId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 404 || !productId) {
				navigate("/admin/inventory");
				toast.error("This product could not be found.");
				return Promise.reject(error);
			}

			if (err.response?.status === 401) {
				toast.error(err.response?.data?.message);
				navigate("/admin/inventory", {
					state: { from: location },
					replace: true,
				});
				return Promise.reject(error);
			}

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/admin/inventory", {
					state: { from: location },
					replace: true,
				});
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<ProductInfo>(
		[`inventory-${productId}`, productId],
		() => getInventoryItem(productId),
		{
			retry: false,
			enabled: !!productId,
		}
	);
};
