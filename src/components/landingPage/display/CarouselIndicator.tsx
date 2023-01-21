import { CarouselIndicatorProps } from "../../../types/landingPageTypes";

export default function CarouselIndicator({
	currentSlide,
	toSlide,
	toSpecificSlide,
}: CarouselIndicatorProps) {
	const active = currentSlide === toSlide ? "bg-gray-900" : "bg-gray-100";
	return (
		<button
			onClick={() => {
				toSpecificSlide(toSlide);
			}}
			name="carouselButtons"
			className={`rounded-full h-1 w-12 ${active}`}
			aria-label="Move to specific carousel image"
		/>
	);
}
