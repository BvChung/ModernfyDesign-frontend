import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductInfo } from "../../../types/productTypes";
import { CustomError } from "../../../types/customTypes";
import { useCartContext } from "../../context/useCartContext";
import { toast } from "react-toastify";

export const useDeleteProduct = (productId: string) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { removeCartItem } = useCartContext();
	const navigate = useNavigate();
	const location = useLocation();

	const deleteProduct = async () => {
		try {
			const response = await eCommerceApiPrivate.delete(
				`/api/admin/inventory/${productId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.update("deletingProduct", {
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
				toast.update("deletingProduct", {
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

			toast.update("deletingProduct", {
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

	return useMutation(deleteProduct, {
		onMutate: () => {
			toast.loading("Deleting this product...", {
				type: "info",
				toastId: "deletingProduct",
			});
		},
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries("products");
			queryClient.invalidateQueries(`product-${data._id}`);
			queryClient.invalidateQueries("inventory");
			queryClient.invalidateQueries("cart");
			removeCartItem(data._id);

			navigate("/admin/inventory");

			toast.update("deletingProduct", {
				render: `${data.name} has been deleted.`,
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
