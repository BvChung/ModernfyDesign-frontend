import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../interfaces/productInterface";
import { useQuery } from "react-query";
import qs from "qs";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";
import { QueryProducts } from "../../interfaces/productInterface";

export const useQueryProducts = (filters: QueryProducts) => {
	const getProducts = async () => {
		try {
			const response = await eCommerceApiPublic.get("/api/products/query", {
				params: {
					category: filters.category,
					priceLow: filters.priceLow,
					priceHigh: filters.priceHigh,
				},
				paramsSerializer: (params) => qs.stringify(params),
			});

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
			if (err.message === "Network Error") {
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<ProductInfo[]>(["products", filters], getProducts);
};
