import { useEffect, useId } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../types/formTypes";
import DetailsModal from "./modal/DetailsModal";
import StateOptions from "./StateOptions";

export default function Shipping() {
	const { myOrder, handleShipping, setMyOrder } = useOrderContext();
	const { cartItemsInfo } = useCartContext();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		setMyOrder((prev) => {
			return {
				...prev,
				shippingInfo: {
					...prev.shippingInfo,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				},
			};
		});
	}, []);

	const shippingInput1: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "firstName",
			label: "First name*",
			required: true,
			pattern: "^[a-zA-Z0-9]{1,25}$",
			name: "firstName",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.firstName,
			maxLength: 25,
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "lastName",
			label: "Last Name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "lastName",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.lastName,
			maxLength: 25,
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid address.",
			id: "address",
			label: "Address*",
			required: true,
			name: "address",
			pattern: "^[a-zA-Z0-9_ ]{1,50}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.address,
			maxLength: 50,
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid apt, suite, etc.",
			id: "aptSuiteEtc",
			label: "Apt, suite, etc. (optional)",
			required: false,
			name: "aptSuiteEtc",
			pattern: "^[a-zA-Z0-9_ ]{1,50}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.aptSuiteEtc,
			maxLength: 50,
			htmlInputSize: "input-md",
		},
	];
	const shippingInput2: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid city.",
			id: "city",
			label: "City*",
			required: true,
			name: "city",
			pattern: "^[a-zA-Z]{1,30}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.city,
			maxLength: 30,
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid zip code.",
			id: "zipCode",
			label: "Zip code*",
			required: true,
			pattern: "^[0-9]{5}(?:-[0-9]{4})?$",
			name: "zipCode",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.zipCode,
			maxLength: 5,
			inputMode: "numeric",
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid phone number.",
			id: "phone",
			label: "Phone*",
			required: true,
			name: "phone",
			pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.phone,
			inputMode: "tel",
			maxLength: 14,
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email*",
			required: true,
			name: "email",
			onChange: handleShipping,
			type: "email",
			value: myOrder.shippingInfo.email,
			maxLength: 50,
			htmlInputSize: "input-md",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center mt-8 mb-10 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex flex-col w-full mb-4 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-medium text-xl sm:text-2xl">
					Shipping Address
				</span>
				<div className="text-sm breadcrumbs hidden sm:inline-flex">
					<ul>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
								/>
							</svg>

							<Link
								to="/cart"
								className="hover:link"
								aria-label="Move to cart page"
							>
								<span>Cart</span>
							</Link>
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>
							<span className="font-semibold underline">Shipping</span>
						</li>
					</ul>
				</div>
			</div>

			<form
				className="flex flex-col-reverse items-center md:items-baseline md:flex-row justify-between w-full lg:max-w-5xl xl:max-w-6xl"
				onSubmit={(e) => {
					e.preventDefault();
					setMyOrder((prev) => {
						return {
							...prev,
							completedShippingForm: true,
						};
					});
					navigate("/checkout/payment");
				}}
			>
				<div className="flex flex-col items-center justify-center w-full md:w-2/3 border-[1px] py-5 px-7 shadow-sm rounded-lg mr-2">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-6">
						{shippingInput1.map((input) => {
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

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">State*</span>
							</label>
							<select
								name="state"
								value={myOrder.shippingInfo.state}
								onChange={handleShipping}
								className="select select-md select-bordered bg-slate-50"
								required
								aria-label="Select state"
							>
								<option disabled value="">
									Select a State
								</option>
								<StateOptions />
							</select>
						</div>

						{shippingInput2.map((input) => {
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

					<div className="flex justify-end w-full mt-8">
						<button
							className="btn px-6 h-11 rounded-md btn-secondary"
							aria-label="Save and continue to payment page"
						>
							Save & Continue
						</button>
					</div>
				</div>

				<div className="hidden md:flex flex-col items-center rounded-lg shadow-sm h-fit w-full md:w-1/3 lg:max-w-[350px] border-[1px] py-6 px-4 mb-6 md:mb-0">
					<div className="w-full flex items-center justify-between mb-4">
						<div>
							<span className="font-medium mr-2 text-sm">Subtotal</span>
							<span className="text-gray-700 text-sm">
								({cartItemsInfo.numItems} items)
							</span>
						</div>
						<div className="font-semibold">
							${cartItemsInfo.subTotal.toFixed(2)}
						</div>
					</div>

					<div className="w-full flex items-center justify-between mb-4">
						<span className="font-medium text-sm">Shipping & Handling</span>
						<span className="font-semibold">Free</span>
					</div>

					<div className="w-full flex items-center justify-between border-b-[1px] border-gray-400 pb-2 mb-4">
						<span className="font-medium text-sm">Taxes</span>
						<span className="font-semibold">
							${cartItemsInfo.tax.toFixed(2)}
						</span>
					</div>

					<div className="w-full flex items-center justify-between">
						<div className="font-semibold ">Estimated total</div>
						<div className="font-semibold">
							${cartItemsInfo.grandTotal.toFixed(2)}
						</div>
					</div>
				</div>

				<DetailsModal
					numItems={cartItemsInfo.numItems}
					subTotal={cartItemsInfo.subTotal}
					tax={cartItemsInfo.tax}
					grandTotal={cartItemsInfo.grandTotal}
				/>
			</form>
		</div>
	);
}
