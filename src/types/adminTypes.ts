export type ModifyAccount = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: number;
	accessToken?: string;
	[key: string]: any;
	setCurrentAccount?: React.Dispatch<React.SetStateAction<CurrentInfo>>;
	setEditingAccount?: React.Dispatch<React.SetStateAction<boolean>>;
	setDeleteConfirmation?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CurrentInfo = {
	_id: string;
	role: number;
};

export type UpdateManagement = {
	_id: string;
	role: number;
};
