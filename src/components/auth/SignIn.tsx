import React, { useState, useId, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoginCredentials } from "../../types/authTypes";
import { useSignInUser } from "../../hooks/auth/useSignInUser";
import { CustomLocationState } from "../../types/customTypes";
import { FormInputProps } from "../../types/formTypes";
import FormInput from "../form/FormInput";
import SpinnerSm from "../loading/SpinnerSm";

export default function SignIn() {
	const navigate = useNavigate();
	const location = useLocation() as CustomLocationState;
	const from = location.state?.from?.pathname || "/";
	const { isSuccess, isLoading, mutate } = useSignInUser();

	const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
		isGuestAccount: false,
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = e.target;

		setLoginCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		mutate(loginCredentials);
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true });

			setLoginCredentials({
				isGuestAccount: false,
				email: "",
				password: "",
			});
		}
	}, [isSuccess, navigate, from]);

	const loginInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email",
			required: true,
			name: "email",
			onChange: handleChange,
			type: "email",
			value: loginCredentials.email,
			pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+(?:.[a-zA-Z]+)*$",
			maxLength: 50,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid password.",
			id: "password",
			label: "Password",
			required: true,
			name: "password",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: loginCredentials.password,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	return (
		<div className="flex items-center justify-center my-4 md:my-32">
			<form
				className="flex flex-col justify-center items-center w-full px-4 md:p-8 md:w-[30rem] md:border-[1px] border-gray-300 md:rounded-lg md:shadow-sm"
				onSubmit={handleSubmit}
			>
				<h1 className="font-semibold text-lg md:text-xl mt-2 mb-4">
					Welcome Back!
				</h1>

				<div className="flex flex-col items-center w-full mb-4">
					{loginInput.map((input) => {
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
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500 bg-slate-50"
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
						h-11 rounded-md shadow-md w-full mb-4"
						aria-label="Sign in"
					>
						{isLoading && !loginCredentials.isGuestAccount ? (
							<SpinnerSm color="text-white" />
						) : (
							"Sign in"
						)}
					</button>
					<button
						onClick={() => {
							setLoginCredentials({
								isGuestAccount: true,
								email: process.env.REACT_APP_GUEST_EMAIL!,
								password: process.env.REACT_APP_GUEST_PASSWORD!,
							});
						}}
						className="btn btn-outline btn-secondary h-11 rounded-md w-full"
						aria-label="Sign in as guest"
					>
						{isLoading && loginCredentials.isGuestAccount ? (
							<SpinnerSm color="text-gray" />
						) : (
							"Sign in as guest"
						)}
					</button>
				</div>

				<div className="flex justify-center items-center gap-2 mb-2">
					<span>New to ModernfyDesign?</span>
					<span
						className="font-semibold hover:link"
						aria-label="Move to register page"
					>
						<Link to="/register">Register</Link>
					</span>
				</div>

				<div className="flex justify-center items-center">
					<Link
						to="/adminsignin"
						className="font-semibold hover:link"
						aria-label="Move to admin sign in"
					>
						Admin Portal
					</Link>
				</div>
			</form>
		</div>
	);
}
