import { useMutation } from "react-query";
import { EditedName } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { usePrivateApi } from "../auth/usePrivateApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useEditName = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const editName = async (credentials: EditedName) => {
		try {
			const response = await eCommerceApiPrivate.patch(
				"/api/users/edit/name",
				credentials
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.update("updatingName", {
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

			toast.update("updatingName", {
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

	return useMutation(editName, {
		onMutate: () => {
			toast.loading("Updating your account...", {
				type: "info",
				toastId: "updatingName",
			});
		},
		onSuccess: (data: EditedName) => {
			setUser((prev) => {
				return {
					...prev,
					firstName: data.firstName,
					lastName: data.lastName,
				};
			});

			toast.update("updatingName", {
				render: "Your name has been changed.",
				type: "success",
				isLoading: false,
				autoClose: 1500,
				draggable: true,
				closeOnClick: true,
			});
		},
	});
};
