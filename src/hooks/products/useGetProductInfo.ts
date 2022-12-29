import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProductInfo } from "../../interfaces/productInterface";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useGetProductInfo = (productId: string) => {
	const navigate = useNavigate();

	const getProductInfo = async (productId: string) => {
		try {
			const response = await eCommerceApiPublic.get(
				`/api/products/${productId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 404 || !productId) {
				navigate("/products");
				toast.error("This product could not be found.");
				return Promise.reject(error);
			}
		}
	};

	return useQuery<ProductInfo>(
		[`product-${productId}`, productId],
		() => getProductInfo(productId),
		{
			// The query will not execute until the productId exists
			enabled: !!productId,
			refetchOnWindowFocus: false,
		}
	);
};
