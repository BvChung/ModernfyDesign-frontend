import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfo } from "../../../types/authTypes";
import { CustomError } from "../../../types/customTypes";
import { toast } from "react-toastify";

export const useDeleteAccount = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const deleteAccount = async (accountId: string) => {
		try {
			const response = await eCommerceApiPrivate.delete(
				`/api/admin/delete/${accountId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.update("deletingAccount", {
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
				toast.update("deletingAccount", {
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

			toast.update("deletingAccount", {
				render: err.response?.data?.message,
				type: "error",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});

			return Promise.reject(error);
		}
	};

	return useMutation(deleteAccount, {
		onMutate: () => {
			toast.loading("Deleting this account...", {
				type: "info",
				toastId: "deletingAccount",
			});
		},
		onSuccess: (data: UserInfo) => {
			queryClient.invalidateQueries("manage");

			toast.update("deletingAccount", {
				render: `${data.firstName} has been deleted.`,
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
