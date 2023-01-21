export type LoginCredentials = {
	isGuestAccount?: boolean;
	email: string;
	password: string;
};

export type RegisterCredentials = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	verifyPassword: string;
};

export type UserInfo = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: number;
	accessToken: string;
};

export type EditedName = {
	firstName: string;
	lastName: string;
};

export type EditedEmail = {
	email: string;
};

export type EditedPassword = {
	currentPassword: string;
	newPassword: string;
	verifyNewPassword?: string;
};
