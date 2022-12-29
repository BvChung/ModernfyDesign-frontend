import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/useAuthContext";
import { storage } from "../../config/tokenStorage";
import { UserInfo, RegisterCredentials } from "../../interfaces/authInterface";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";

export const useRegisterUser = () => {
	const { setUser } = useAuthContext();

	const register = async (credentials: RegisterCredentials) => {
		try {
			const response = await eCommerceApiPublic.post(
				"/api/users/register",
				credentials
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useMutation(register, {
		onSuccess: (data: UserInfo) => {
			setUser(data);
			storage.setToken(data.accessToken);
			toast.success(`${data.firstName} ${data.lastName} has been registered.`);
		},
	});
};
