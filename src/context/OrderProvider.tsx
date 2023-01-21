import React, { createContext, useState } from "react";
import { OrderForm } from "../types/orderTypes";

type OrderContextTypes = {
	myOrder: OrderForm;
	setMyOrder: React.Dispatch<React.SetStateAction<OrderForm>>;
	handlePayment(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	): void;
	handleShipping(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	): void;
	clearMyOrder(): void;
};

type OrderProviderProps = {
	children: React.ReactNode;
};

export const OrderContext = createContext({} as OrderContextTypes);

export const OrderProvider = ({ children }: OrderProviderProps) => {
	const [myOrder, setMyOrder] = useState<OrderForm>({
		shippingInfo: {
			firstName: "",
			lastName: "",
			address: "",
			aptSuiteEtc: "",
			state: "",
			city: "",
			zipCode: "",
			phone: "",
			email: "",
		},
		paymentInfo: {
			cardNumber: "",
			cardHolderFirstName: "",
			cardHolderLastName: "",
			expiryDateMonth: "",
			expiryDateYear: "",
			securityCode: "",
			phone: "",
			subTotal: 0,
		},
		completedPaymentForm: false,
		completedShippingForm: false,
	});

	function handlePayment(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;

		setMyOrder((prev) => {
			return {
				...prev,
				paymentInfo: {
					...prev.paymentInfo,
					[name]: value,
				},
			};
		});
	}

	function handleShipping(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;

		setMyOrder((prev) => {
			return {
				...prev,
				shippingInfo: {
					...prev.shippingInfo,
					[name]: value,
				},
			};
		});
	}

	function clearMyOrder() {
		setMyOrder({
			shippingInfo: {
				firstName: "",
				lastName: "",
				address: "",
				aptSuiteEtc: "",
				state: "",
				city: "",
				zipCode: "",
				phone: "",
				email: "",
			},
			paymentInfo: {
				cardNumber: "",
				cardHolderFirstName: "",
				cardHolderLastName: "",
				expiryDateMonth: "",
				expiryDateYear: "",
				securityCode: "",
				phone: "",
				subTotal: 0,
			},
			completedPaymentForm: false,
			completedShippingForm: false,
		});
	}

	return (
		<OrderContext.Provider
			value={{
				myOrder,
				setMyOrder,
				handlePayment,
				handleShipping,
				clearMyOrder,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
