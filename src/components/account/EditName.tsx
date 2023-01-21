import React, { useState, useId, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../interfaces/formInterface";
import { EditedName } from "../../interfaces/authInterface";
import { useEditName } from "../../hooks/account/useEditName";

export default function EditName() {
	const { user } = useAuthContext();
	const { mutate } = useEditName();
	const navigate = useNavigate();
	const [nameCredentials, setNameCredentials] = useState<EditedName>({
		firstName: user.firstName,
		lastName: user.lastName,
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setNameCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		mutate(nameCredentials);
	}

	useEffect(() => {
		setNameCredentials({
			firstName: user.firstName,
			lastName: user.lastName,
		});
	}, [user]);

	const nameInput: FormInputProps[] = [
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
			value: nameCredentials.firstName,
			maxLength: 25,
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
			value: nameCredentials.lastName,
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

							setNameCredentials({
								firstName: user.firstName,
								lastName: user.lastName,
							});
							navigate("/account");
						}}
						aria-label="Return to account page"
						className="mr-4 cursor-pointer"
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

					<span className="font-medium text-lg sm:text-xl">Update Name</span>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center w-full md:w-[30rem] border-[1px] rounded-lg shadow-sm"
			>
				<div className="p-7 w-full">
					<div className="flex flex-col items-center w-full mb-10">
						{nameInput.map((input) => {
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
					<div className="flex items-center justify-end gap-4">
						<button
							onClick={(e) => {
								e.preventDefault();

								setNameCredentials({
									firstName: user.firstName,
									lastName: user.lastName,
								});
								navigate("/account");
							}}
							className="btn btn-outline btn-accent rounded-md h-11 px-4"
							aria-label="Cancel editing name"
						>
							Cancel
						</button>
						<button
							className="btn btn-secondary rounded-md h-11 px-6"
							aria-label="Submit new name"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
