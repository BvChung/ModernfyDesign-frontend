import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfo } from "../../../types/authTypes";
import { CustomError } from "../../../types/customTypes";
import { toast } from "react-toastify";
import { UpdateManagement } from "../../../types/adminTypes";

export const useUpdateRole = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const updateRole = async (updatedInfo: UpdateManagement) => {
		try {
			const response = await eCommerceApiPrivate.patch(
				`/api/admin/edit`,
				updatedInfo
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.update("updatingAccount", {
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
				toast.update("updatingAccount", {
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

			toast.update("updatingAccount", {
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

	return useMutation(updateRole, {
		onMutate: () => {
			toast.loading("Updating this account...", {
				type: "info",
				toastId: "updatingAccount",
			});
		},
		onSuccess: (data: UserInfo) => {
			queryClient.invalidateQueries("manage");

			toast.update("updatingAccount", {
				render: `${data.firstName} has been updated.`,
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
