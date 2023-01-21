export type FormInputProps = {
	key?: string;
	id: string;
	type: string;
	name: string;
	value: string | number | readonly string[] | undefined;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	required: boolean;
	pattern?: string;
	label: string;
	errorMessage: string;
	inputMode?:
		| "text"
		| "email"
		| "search"
		| "tel"
		| "url"
		| "none"
		| "numeric"
		| "decimal"
		| undefined;
	maxLength?: number;
	htmlInputSize?: string;
	width?: string;
};
