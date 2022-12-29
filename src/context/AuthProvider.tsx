import React, { createContext, useState } from "react";
import { UserInfo } from "../interfaces/authInterface";

interface AuthContextInterface {
	user: UserInfo;
	setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
	logoutUser(): void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<UserInfo>({
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		role: 0,
		accessToken: "",
	});

	function logoutUser() {
		setUser({
			_id: "",
			firstName: "",
			lastName: "",
			email: "",
			role: 0,
			accessToken: "",
		});
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
