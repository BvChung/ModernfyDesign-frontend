type Product = {
	name: string;
	description: string;
	color: string;
	category: string;
};

export type ProductInfo = {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	[key: string]: any;
	createdBy: string;
	setSearchText?: React.Dispatch<React.SetStateAction<string>>;
} & Product;

export type ProductCreation = {
	fileName: string | null;
	image: string | null;
	price: number;
} & Product;

export type ProductUpdate = {
	fileName?: string | null;
	image?: string | null;
	price: number;
} & Product;

export type ProductForm = {
	price: string;
	color: string;
} & Product;

export type QueryProducts = {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
};

export type FilterProducts = {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
};

export type FilterFunctions = {
	handleChange(e: React.ChangeEvent<HTMLInputElement>, category: string): void;
	setFilter: React.Dispatch<React.SetStateAction<FilterProducts>>;
};

export type SortProducts = {
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
};
