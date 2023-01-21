import React, { useState, useId, useEffect } from "react";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../interfaces/formInterface";
import { EditedPassword } from "../../interfaces/authInterface";
import { useEditPassword } from "../../hooks/account/useEditPassword";
import { useNavigate } from "react-router-dom";

export default function EditPassword() {
	const { mutate, isSuccess } = useEditPassword();
	const navigate = useNavigate();

	const [passwordCredentials, setPasswordCredentials] =
		useState<EditedPassword>({
			currentPassword: "",
			newPassword: "",
			verifyNewPassword: "",
		});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setPasswordCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		mutate(passwordCredentials);
	}

	useEffect(() => {
		if (isSuccess) {
			setPasswordCredentials({
				currentPassword: "",
				newPassword: "",
				verifyNewPassword: "",
			});
		}
	}, [isSuccess]);

	const passwordInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "currentPassword",
			label: "Current password",
			required: true,
			name: "currentPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: passwordCredentials.currentPassword,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
		},
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "newPassword",
			label: "New password",
			required: true,
			name: "newPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: passwordCredentials.newPassword,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
		},
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "verifyNewPassword",
			label: "Verify new password",
			required: true,
			name: "verifyNewPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: passwordCredentials.verifyNewPassword,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
		},
	];

	return (
		<div className="flex flex-col items-center justify-center mx-4 lg:mx-0">
			<div className="flex w-full items-center justify-center px-1 mt-8 mb-6">
				<div className="flex items-center w-full md:w-[30rem]">
					<button
						onClick={(e) => {
							e.preventDefault();

							setPasswordCredentials({
								currentPassword: "",
								newPassword: "",
								verifyNewPassword: "",
							});
							navigate("/account");
						}}
						className="mr-4 cursor-pointer"
						aria-label="Return to account page"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</button>

					<span className="font-medium text-lg sm:text-xl">
						Update Password
					</span>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center w-full md:w-[30rem] border-[1px] rounded-lg shadow-sm"
			>
				<div className="p-7 w-full">
					<div className="flex flex-col items-center mb-1 w-full">
						{passwordInput.map((input) => {
							return (
								<FormInput
									key={input.key}
									errorMessage={input.errorMessage}
									id={input.id}
									label={input.label}
									name={input.name}
									onChange={input.onChange}
									required={input.required}
									type={input.type}
									value={input.value}
									pattern={input.pattern}
									inputMode={input.inputMode}
									maxLength={input.maxLength}
									htmlInputSize={input.htmlInputSize}
								/>
							);
						})}
					</div>
					<label className="label cursor-pointer mb-10">
						<span className="label-text">Show password</span>
						<input
							type="checkbox"
							className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							onChange={() => {
								setShowPassword((prev) => !prev);
							}}
						/>
					</label>
					<div className="flex items-center justify-end gap-4">
						<button
							onClick={(e) => {
								e.preventDefault();

								setPasswordCredentials({
									currentPassword: "",
									newPassword: "",
									verifyNewPassword: "",
								});
								navigate("/account");
							}}
							className="btn btn-outline btn-accent rounded-md h-11 px-4"
							aria-label="Cancel editing email"
						>
							Cancel
						</button>
						<button
							className="btn btn-secondary rounded-md h-11 px-6"
							aria-label="Submit new email"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
