import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetUser } from "../../hooks/auth/useGetUser";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import Spinner from "../loading/Spinner";

export default function PersistLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useAuthContext();
	const getUser = useGetUser();

	// Authenticate JWT sent by cookie on user device to backend to load account information
	useEffect(() => {
		const verifyUser = async (): Promise<void> => {
			try {
				await getUser();
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		};

		!user?.accessToken ? verifyUser() : setIsLoading(false);
	}, []);

	return <>{!isLoading ? <Outlet /> : <Spinner minHeight="min-h-screen" />}</>;
}
