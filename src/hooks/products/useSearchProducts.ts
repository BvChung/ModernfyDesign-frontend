import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../types/productTypes";
import { useQuery } from "react-query";
import { CustomError } from "../../types/customTypes";
import { toast } from "react-toastify";

export const useSearchProducts = () => {
	const searchProducts = async () => {
		try {
			const response = await eCommerceApiPublic.get("/api/products");

			return response.data.sort((a: ProductInfo, b: ProductInfo) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				// names must be equal
				return 0;
			});
		} catch (error) {
			const err = error as CustomError;
			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<ProductInfo[]>("searchProducts", searchProducts, {
		enabled: false,
	});
};
