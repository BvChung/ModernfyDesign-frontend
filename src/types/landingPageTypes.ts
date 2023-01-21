export type CarouselProps = {
	title: string;
	subTitle: string;
	slides: string[];
	delay: number;
};

export type CarouselIndicatorProps = {
	currentSlide: number;
	toSlide: number;
	toSpecificSlide(slide: number): void;
};

export type CategoryProps = {
	imgPubId: string;
	title: string;
};
