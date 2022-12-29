import React from "react";

interface CarouselIndicator {
	currentIndex: number;
	toIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Indicator({
	currentIndex,
	toIndex,
	setCurrentIndex,
}: CarouselIndicator) {
	const active = currentIndex === toIndex ? "bg-gray-900" : "bg-gray-100";
	return (
		<button
			onClick={() => {
				setCurrentIndex(toIndex);
			}}
			name="carouselButtons"
			className={`rounded-full h-1 w-12 ${active}`}
			aria-label="Move to specific carousel image"
		/>
	);
}
