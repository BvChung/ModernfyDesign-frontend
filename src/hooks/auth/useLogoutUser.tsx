import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { eCommerceApiPublic } from "../../api/axios";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { storage } from "../../config/tokenStorage";

export const useLogoutUser = () => {
	const queryClient = useQueryClient();
	const { logoutUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = async () => {
		try {
			const response = await eCommerceApiPublic.post("/api/users/logout");

			return response.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	return useMutation(logout, {
		onSuccess: () => {
			toast.success("User has been logged out");
			queryClient.cancelQueries("orders");
			logoutUser();
			storage.clearToken();
			navigate("/");
		},
	});
};
