import { useMutation } from "react-query";
import { EditedEmail } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { usePrivateApi } from "../auth/usePrivateApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useEditEmail = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const editEmail = async (credentials: EditedEmail) => {
		try {
			const response = await eCommerceApiPrivate.patch(
				"/api/users/edit/email",
				credentials
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.update("updatingEmail", {
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

			toast.update("updatingEmail", {
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

	return useMutation(editEmail, {
		onMutate: () => {
			toast.loading("Updating your account...", {
				type: "info",
				toastId: "updatingEmail",
			});
		},
		onSuccess: (data: EditedEmail) => {
			setUser((prev) => {
				return {
					...prev,
					email: data.email,
				};
			});

			toast.update("updatingEmail", {
				render: "Your email has been changed.",
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
