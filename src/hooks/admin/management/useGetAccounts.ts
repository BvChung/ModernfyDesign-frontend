import { usePrivateApi } from "../../auth/usePrivateApi";
import { useQuery } from "react-query";
import { ModifyAccount } from "../../../types/adminTypes";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../../types/customTypes";
import { toast } from "react-toastify";

export const useGetAccounts = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const getAccounts = async () => {
		try {
			const response = await eCommerceApiPrivate.get("/api/admin/manage");

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.error(err.response?.data?.message);
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<ModifyAccount[]>("manage", getAccounts, {
		retry: false,
	});
};
