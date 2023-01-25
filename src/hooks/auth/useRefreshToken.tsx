import { eCommerceApiPublic } from "../../api/axios";
import { storage } from "../../config/tokenStorage";
import { useAuthContext } from "../context/useAuthContext";

export const useRefreshToken = () => {
	const { setUser } = useAuthContext();

	const refreshToken = async () => {
		try {
			const response = await eCommerceApiPublic.get("/api/refresh");

			storage.setToken(response.data);

			setUser((prev) => {
				return {
					...prev!,
					accessToken: response.data,
				};
			});

			return response.data;
		} catch (error) {
			const err = error;
		}
	};

	return refreshToken;
};
