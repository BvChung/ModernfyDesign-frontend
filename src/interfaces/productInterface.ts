interface Product {
	name: string;
	description: string;
	color: string;
	category: string;
}

export interface ProductInfo extends Product {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	[key: string]: any;
	createdBy: string;
	setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProductCreation extends Product {
	fileName: string | null;
	image: string | null;
	price: number;
}

export interface ProductUpdate extends Product {
	fileName?: string | null;
	image?: string | null;
	price: number;
}

export interface ProductForm extends Product {
	price: string;
	color: string;
}

export interface QueryProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export interface SortProducts {
	field: string;
	name: {
		sortDescending: boolean;
	};
	category: {
		sortDescending: boolean;
	};
	price: {
		sortDescending: boolean;
	};
	[key: string]: any;
}
