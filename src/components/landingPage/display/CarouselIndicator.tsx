import { CarouselIndicatorProps } from "../../../types/landingPageTypes";

export default function CarouselIndicator({
	currentSlide,
	toSlide,
	changeSlide,
}: CarouselIndicatorProps) {
	const isActive = currentSlide === toSlide ? "bg-gray-900" : "bg-gray-100";
	return (
		<button
			onClick={() => {
				changeSlide(toSlide);
			}}
			name="carouselButtons"
			className={`rounded-full h-1 w-12 ${isActive}`}
			aria-label="Move to specific carousel image"
		/>
	);
}
