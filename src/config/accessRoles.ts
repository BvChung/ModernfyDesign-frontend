interface Roles {
	Admin: number;
	Manager: number;
	Consumer: number;
	[key: string]: any;
}

export const accessRoles: Roles = {
	Admin: 6114,
	Manager: 5325,
	Consumer: 5050,
};
