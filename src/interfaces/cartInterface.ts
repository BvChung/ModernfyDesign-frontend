interface Cart {
	_id: string;
}

export interface CartStorageData extends Cart {
	price: number;
	quantity: number;
}

export interface CartCheckoutInfo {
	subTotal: number;
	numItems: number;
	tax: number;
	grandTotal: number;
}

export interface CartItemQuantity extends Cart {
	quantity: number;
}

export interface CartItemPrice extends Cart {
	price: number;
}

export interface CartItemInfo {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	name: string;
	description: string;
	color: string;
	category: string;
	// quantity?: number;
}

// export interface CartItemInfo extends ProductInfo {
// 	quantity: number;
// }
