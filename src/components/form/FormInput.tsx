import { useState } from "react";
import { FormInputProps } from "../../interfaces/formInterface";

export default function FormInput({
	id,
	name,
	onChange,
	pattern,
	required,
	type,
	value,
	label,
	errorMessage,
	inputMode,
	maxLength,
	htmlInputSize,
	width,
}: FormInputProps) {
	const [inputFocused, setInputFocused] = useState(false);

	const displayErrorMsg =
		inputFocused && value !== "" && "peer-invalid:inline-flex";
	const displayErrorInput =
		inputFocused &&
		value !== "" &&
		"invalid:input-error invalid:focus:outline-none";

	return (
		<div className="form-control w-full">
			<label className="label">
				<span className="label-text">{label}</span>
			</label>
			<input
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				inputMode={inputMode}
				className={`peer input ${displayErrorInput} input-md ${width} input-bordered `}
				pattern={pattern}
				required={required}
				maxLength={maxLength}
				onFocus={() => {
					setInputFocused(true);
				}}
				onBlur={() => {
					setInputFocused(false);
				}}
				aria-label={`${label} form`}
			/>
			<div
				className={`label pt-1 pb-0 hidden ${displayErrorMsg} justify-start items-center gap-1 label-text-alt text-red-600 font-medium transition-all`}
			>
				<span className="w-fit max-w-xs">{errorMessage}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		</div>
	);
}
