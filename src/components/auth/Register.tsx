import React, { useState, useId, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RegisterCredentials } from "../../types/authTypes";
import { useRegisterUser } from "../../hooks/auth/useRegisterUser";
import { FormInputProps } from "../../types/formTypes";
import { CustomLocationState } from "../../types/customTypes";
import FormInput from "../form/FormInput";
import { toast } from "react-toastify";
import SpinnerSm from "../loading/SpinnerSm";

export default function Register() {
	const navigate = useNavigate();
	const location = useLocation() as CustomLocationState;
	const from = location.state?.from?.pathname || "/";
	const { isSuccess, isLoading, mutate } = useRegisterUser();

	const [registerCredentials, setRegisterCredentials] =
		useState<RegisterCredentials>({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			verifyPassword: "",
		});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setRegisterCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (registerCredentials.password !== registerCredentials.verifyPassword) {
			return toast.error("Passwords do not match");
		}

		mutate(registerCredentials);
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true });

			setRegisterCredentials({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				verifyPassword: "",
			});
		}
	}, [isSuccess, navigate, from]);

	const registerName: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "firstName",
			label: "First name",
			required: true,
			pattern: "^[a-zA-Z0-9]{1,25}$",
			name: "firstName",
			onChange: handleChange,
			type: "text",
			value: registerCredentials.firstName,
			maxLength: 25,
			htmlInputSize: "md",
			width: "w-2",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "lastName",
			label: "Last name",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "lastName",
			onChange: handleChange,
			type: "text",
			value: registerCredentials.lastName,
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	const registerInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email",
			required: true,
			name: "email",
			onChange: handleChange,
			type: "text",
			value: registerCredentials.email,
			pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+(?:.[a-zA-Z]+)*$",
			maxLength: 50,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "password",
			label: "Password",
			required: true,
			name: "password",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: registerCredentials.password,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "verifyPassword",
			label: "Verify password",
			required: true,
			name: "verifyPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: registerCredentials.verifyPassword,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	return (
		<div className="flex items-center justify-center my-4 md:my-32">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center items-center w-full px-4 md:p-8 md:w-[30rem] md:border-[1px] border-gray-300 md:rounded-lg md:shadow-sm"
			>
				<h1 className="font-semibold text-lg md:text-xl mt-2 mb-4">
					Create Your Account
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 w-full  md:gap-4">
					{registerName.map((input) => {
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

				<div className="flex flex-col w-full mb-4">
					{registerInput.map((input) => {
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

					<div className="flex w-full justify-start item-start mt-1">
						<label className="label cursor-pointer">
							<span className="label-text mr-2">Show password</span>
							<input
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
								onChange={() => {
									setShowPassword((prev) => !prev);
								}}
							/>
						</label>
					</div>
				</div>

				<div className="flex flex-col w-full justify-center items-start mb-6">
					<button
						className="btn bg-accent4 border-accent4 hover:border-accent2 hover:bg-accent2 
						h-11 rounded-md shadow-md w-full"
						aria-label="Sign in"
					>
						{isLoading ? <SpinnerSm color="text-white" /> : "Register"}
					</button>
				</div>

				<div className="flex justify-center items-center gap-2 px-8">
					<span>Already have an account?</span>
					<Link
						to="/signin"
						className="font-semibold hover:link"
						aria-label="Move to sign in page"
					>
						Sign in
					</Link>
				</div>
			</form>
		</div>
	);
}
