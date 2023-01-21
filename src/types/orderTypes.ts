type OrderShippingInfo = {
	firstName: string;
	lastName: string;
	address: string;
	aptSuiteEtc?: string;
	state: string;
	city: string;
	zipCode: string;
	phone: string;
	email: string;
};

type OrderPaymentInfo = {
	cardNumber: string;
	cardHolderFirstName: string;
	cardHolderLastName: string;
	expiryDateMonth: string;
	expiryDateYear: string;
	securityCode: string;
	phone: string;
	subTotal: number;
};

export type OrderForm = {
	shippingInfo: OrderShippingInfo;
	paymentInfo: OrderPaymentInfo;
	completedShippingForm: boolean;
	completedPaymentForm: boolean;
};

export type OrderPurchasedItems = {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	name: string;
	description: string;
	color: string;
	category: string;
	quantity?: number;
};

// const now = new Date("2022-07-08T23:43:14.121+00:00"); => from mongoDB created at
export type OrderInfo = {
	_id?: string;
	purchasedItems: OrderPurchasedItems[];
	shippingInfo: OrderShippingInfo;
	paymentInfo: OrderPaymentInfo;
	createdAt?: string | number | Date;
};

export type OrderCreation = {
	accountId: string;
} & OrderInfo;
