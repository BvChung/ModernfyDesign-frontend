import { usePrivateApi } from "../../auth/usePrivateApi";
import { ProductInfo } from "../../../interfaces/productInterface";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useGetInventory = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const getInventory = async () => {
		try {
			const response = await eCommerceApiPrivate.get("/api/admin/inventory");

			return response.data.sort((a: ProductInfo, b: ProductInfo) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.error(err.response?.data?.message);
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<ProductInfo[]>("inventory", getInventory, {
		retry: false,
	});
};
