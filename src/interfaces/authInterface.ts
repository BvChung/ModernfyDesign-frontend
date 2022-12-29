export interface LoginCredentials {
	isGuestAccount?: boolean;
	email: string;
	password: string;
}

export interface RegisterCredentials {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	verifyPassword: string;
}

export interface UserInfo {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: number;
	accessToken: string;
}

export interface EditedName {
	firstName: string;
	lastName: string;
}

export interface EditedEmail {
	email: string;
}

export interface EditedPassword {
	currentPassword: string;
	newPassword: string;
	verifyNewPassword?: string;
}
