import { useAuthContext } from "../context/useAuthContext";
import { usePrivateApi } from "./usePrivateApi";
import { storage } from "../../config/tokenStorage";

export const useGetUser = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();

	const getUser = async (): Promise<void> => {
		try {
			const response = await eCommerceApiPrivate.get("/api/users/me");

			if (response.status === 200) {
				setUser(() => {
					return {
						...response.data,
						accessToken: storage.getToken(),
					};
				});
			}
		} catch (error) {
			return Promise.reject(error);
		}
	};

	return getUser;
};
