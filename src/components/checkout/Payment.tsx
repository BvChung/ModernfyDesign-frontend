import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { FormInputProps } from "../../types/formTypes";
import FormInput from "../form/FormInput";
import DetailsModal from "./modal/DetailsModal";

export default function Payment() {
	const { myOrder, handlePayment, setMyOrder } = useOrderContext();
	const { cartItemsInfo } = useCartContext();
	const navigate = useNavigate();

	const paymentInput3: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid card number.",
			id: "cardNumber",
			label: "Card number*",
			required: true,
			pattern: "^[0-9]{15,19}$",
			name: "cardNumber",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.cardNumber,
			inputMode: "numeric",
			maxLength: 19,
			htmlInputSize: "input-md",
			width: "w-full",
		},
	];

	const paymentInput1: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "cardHolderFirstName",
			label: "First name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "cardHolderFirstName",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.cardHolderFirstName,
			maxLength: 25,
			htmlInputSize: "input-md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "cardHolderLastName",
			label: "Last name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "cardHolderLastName",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.cardHolderLastName,
			maxLength: 25,
			htmlInputSize: "input-md",
		},
	];

	const paymentInput2: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid CVV.",
			id: "securityCode",
			label: "CVV*",
			required: true,
			pattern: "^[0-9]{3,4}$",
			name: "securityCode",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.securityCode,
			inputMode: "numeric",
			maxLength: 4,
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
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.phone,
			inputMode: "tel",
			maxLength: 14,
			htmlInputSize: "input-md",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center mt-8 mb-10 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex flex-col w-full mb-4 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-medium text-xl sm:text-2xl">Payment</span>
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
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>
							<Link
								to="/checkout/shipping"
								className="hover:link"
								aria-label="Move to shipping page"
							>
								Shipping
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
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
								/>
							</svg>
							<span className="font-semibold underline">Payment</span>
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
							completedPaymentForm: true,
						};
					});
					navigate("/checkout/confirmation");
				}}
			>
				<div className="flex flex-col border-[1px] items-center justify-center w-full md:w-2/3 py-5 px-7 shadow-sm rounded-lg mr-2">
					<div className="w-full mb-4">
						{paymentInput3.map((input) => {
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
									width={input.width}
								/>
							);
						})}
					</div>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-6">
						{paymentInput1.map((input) => {
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

						<div className="form-control w-full max-w-sm">
							<label className="label">
								<span className="label-text">Expiration date</span>
							</label>
							<div className="grid grid-cols-2 gap-4">
								<select
									name="expiryDateMonth"
									value={myOrder.paymentInfo.expiryDateMonth}
									onChange={handlePayment}
									className="select select-md select-bordered"
									required
									aria-label="Select card month expiration"
								>
									<option disabled value="">
										Month
									</option>
									<option value="01">01</option>
									<option value="02">02</option>
									<option value="03">03</option>
									<option value="04">04</option>
									<option value="05">05</option>
									<option value="06">06</option>
									<option value="07">07</option>
									<option value="08">08</option>
									<option value="09">09</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
								</select>

								<select
									name="expiryDateYear"
									value={myOrder.paymentInfo.expiryDateYear}
									onChange={handlePayment}
									className="select select-md select-bordered"
									required
									aria-label="Select card year expiration"
								>
									<option disabled value="">
										Year
									</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
								</select>
							</div>
						</div>

						{paymentInput2.map((input) => {
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

					<div className="flex w-full gap-6 justify-end mt-8">
						<Link
							to="/checkout/shipping"
							className="btn btn-outline btn-accent h-11 rounded-md px-6"
							aria-label="Return to shipping page"
						>
							Return
						</Link>
						<button
							className="btn px-6 h-11 rounded-md btn-secondary"
							aria-label="Save and continue to review order page"
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
