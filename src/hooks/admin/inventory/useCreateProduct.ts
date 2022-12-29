import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import {
	ProductInfo,
	ProductCreation,
} from "../../../interfaces/productInterface";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const createProduct = async (productData: ProductCreation) => {
		try {
			const response = await eCommerceApiPrivate.post(
				"/api/admin/inventory",
				productData
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.update("creatingProduct", {
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
				toast.update("creatingProduct", {
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
				toast.update("creatingProduct", {
					render: "Cors error, please use a different image.",
					type: "error",
					autoClose: 1500,
					isLoading: false,
					draggable: true,
					closeOnClick: true,
				});

				return Promise.reject(error);
			}

			toast.update("creatingProduct", {
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

	return useMutation(createProduct, {
		onMutate: () => {
			toast.loading("Creating this product...", {
				type: "info",
				toastId: "creatingProduct",
			});
		},
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries("products");

			toast.update("creatingProduct", {
				render: `${data.name} has been created.`,
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
