type Cart = {
	_id: string;
};

export type CartStorageData = {
	price: number;
	quantity: number;
} & Cart;

export type CartCheckoutInfo = {
	subTotal: number;
	numItems: number;
	tax: number;
	grandTotal: number;
};

export type CartItemQuantity = {
	quantity: number;
} & Cart;

export type CartItemPrice = {
	price: number;
} & Cart;

export type CartItemInfo = {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	name: string;
	description: string;
	color: string;
	category: string;
};
