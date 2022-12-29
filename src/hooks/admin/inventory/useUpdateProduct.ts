import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import {
	ProductUpdate,
	ProductInfo,
} from "../../../interfaces/productInterface";
import { useCartContext } from "../../context/useCartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useUpdateProduct = (productId: string | undefined) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { updateCartPrice, findCartItem } = useCartContext();
	const navigate = useNavigate();
	const location = useLocation();

	const updateProduct = async (updatedInfo: ProductUpdate) => {
		try {
			const response = await eCommerceApiPrivate.patch(
				`/api/admin/inventory/${productId}`,
				updatedInfo
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.update("updatingProduct", {
					render: err.response?.data?.message,
					type: "error",
					isLoading: false,
					autoClose: 1500,
					draggable: true,
					closeOnClick: true,
				});

				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.update("updatingProduct", {
					render: "Your session has expired.",
					type: "info",
					isLoading: false,
					autoClose: 1500,
					draggable: true,
					closeOnClick: true,
				});

				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			if (err.name === "AxiosError" && err.code === "ERR_NETWORK") {
				toast.update("updatingProduct", {
					render: "Cors error, please use a different image.",
					type: "error",
					isLoading: false,
					autoClose: 1500,
					draggable: true,
					closeOnClick: true,
				});

				return Promise.reject(error);
			}

			toast.update("updatingProduct", {
				render: err.response?.data?.message,
				type: "error",
				isLoading: false,
				autoClose: 3000,
				draggable: true,
				closeOnClick: true,
			});

			return Promise.reject(error);
		}
	};

	return useMutation(updateProduct, {
		onMutate: () => {
			toast.loading("Updating this product...", {
				type: "info",
				toastId: "updatingProduct",
			});
		},
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries(`product-${data._id}`);
			queryClient.invalidateQueries("products");
			queryClient.invalidateQueries("inventory");
			queryClient.invalidateQueries(`inventory-${data._id}`);
			queryClient.invalidateQueries("cart");

			if (findCartItem(productId)?.price !== data.price) {
				updateCartPrice({ _id: data._id, price: data.price });
			}

			toast.update("updatingProduct", {
				render: `${data.name} has been updated.`,
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
