import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { LoginCredentials, UserInfo } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";
import { storage } from "../../config/tokenStorage";

// Make req to api with login info => returns token
// Store token to local storage
// Then make req api with token => returns account information using useQuery() to store

export const useSignInUser = () => {
	const { setUser } = useAuthContext();

	const signIn = async (credentials: LoginCredentials) => {
		try {
			const response = await eCommerceApiPublic.post(
				"/api/users/login",
				credentials
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useMutation(signIn, {
		onSuccess: (data: UserInfo) => {
			toast.success("User has been logged in.");
			setUser(data);
			storage.setToken(data.accessToken);
		},
	});
};
