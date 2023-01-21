export type CustomError = {
	code?: string;
	response?: {
		data: {
			message: string;
			stack: string;
		};
		status: number;
	};
} & Error;

export type CustomLocationState = {
	pathname: string | null;
	search: string | null;
	hash: string | null;
	state: {
		from: {
			hash: string;
			key: string;
			pathname: string;
			search: string;
			state: null | object;
		};
	};
	key: string | null;
};
