export interface CarouselData {
	slides: string[];
}

export const carouselData: CarouselData = {
	slides: [
		process.env.REACT_APP_CAROUSEL_IMAGE_1!,
		process.env.REACT_APP_CAROUSEL_IMAGE_2!,
		process.env.REACT_APP_CAROUSEL_IMAGE_3!,
		process.env.REACT_APP_CAROUSEL_IMAGE_4!,
		process.env.REACT_APP_CAROUSEL_IMAGE_5!,
	],
};

export const categoryData = [
	{
		id: 1,
		imgPubId: process.env.REACT_APP_CATEGORY_IMAGE_1!,
		title: "Sofas",
	},
	{
		id: 2,
		imgPubId: process.env.REACT_APP_CATEGORY_IMAGE_2!,
		title: "Tables",
	},
	{
		id: 3,
		imgPubId: process.env.REACT_APP_CATEGORY_IMAGE_3!,
		title: "Desks",
	},
	{
		id: 4,
		imgPubId: process.env.REACT_APP_CATEGORY_IMAGE_4!,
		title: "Chairs",
	},
	{
		id: 5,
		imgPubId: process.env.REACT_APP_CATEGORY_IMAGE_5!,
		title: "Drawers",
	},
	{
		id: 6,
		imgPubId: process.env.REACT_APP_CATEGORY_IMAGE_6!,
		title: "Shelves",
	},
];
