import { useMutation } from "react-query";
import { EditedPassword } from "../../types/authTypes";
import { usePrivateApi } from "../auth/usePrivateApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../types/customTypes";
import { toast } from "react-toastify";

export const useEditPassword = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();
	const tId = "updatingPassword";

	const editPassword = async (credentials: EditedPassword) => {
		try {
			await eCommerceApiPrivate.patch("/api/users/edit/password", credentials);
		} catch (error) {
			const err = error as CustomError;

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.update("updatingPassword", {
					render: "Your session has expired.",
					type: "info",
					isLoading: false,
					autoClose: 1500,
					draggable: true,
					closeOnClick: true,
				});
				navigate("/signin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.update("updatingPassword", {
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

	return useMutation(editPassword, {
		onMutate: () => {
			toast.loading("Updating your account...", {
				type: "info",
				toastId: tId,
			});
		},
		onSuccess: () => {
			toast.update(tId, {
				render: "Your password has been changed.",
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
