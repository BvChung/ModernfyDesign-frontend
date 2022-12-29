export const storage = {
	getToken: () => {
		const accessToken = localStorage.getItem("auth_token");

		if (accessToken) return JSON.parse(accessToken);
	},
	setToken: (accessToken: string): void =>
		localStorage.setItem("auth_token", JSON.stringify(accessToken)),
	clearToken: (): void => localStorage.removeItem("auth_token"),
};
