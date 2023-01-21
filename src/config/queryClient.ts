import { QueryClient } from "react-query";
import { toast } from "react-toastify";
import { CustomError } from "../types/customTypes";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			onError: (error) => {
				const err = error as CustomError;

				if (err?.message === "Network Error") {
					toast.error(err?.message, { toastId: "network", autoClose: false });
				}
			},
		},
	},
});
