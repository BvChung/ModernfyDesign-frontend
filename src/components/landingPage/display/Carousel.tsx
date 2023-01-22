import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarouselIndicator from "./CarouselIndicator";
import { AdvancedImage } from "@cloudinary/react";
import { cldConfig } from "../../../config/cloudinaryConfig";
import { useInterval } from "../../../hooks/interval/useInterval";
import { CarouselProps } from "../../../types/landingPageTypes";

export default function Carousel({
	title,
	subTitle,
	slides,
	delay,
}: CarouselProps) {
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	useEffect(() => {
		startTimer();

		return () => stopTimer();
	}, []);

	useInterval(
		() => {
			setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		},
		isRunning ? delay : null
	);

	function startTimer() {
		setIsRunning(true);
	}

	function toNextSlide() {
		stopTimer();
		setCurrentSlide((prev) =>
			currentSlide === slides.length - 1 ? 0 : prev + 1
		);
		startTimer();
	}

	function toPrevSlide() {
		stopTimer();
		setCurrentSlide((prev) =>
			currentSlide === 0 ? slides.length - 1 : prev - 1
		);
		startTimer();
	}

	function stopTimer() {
		setIsRunning(false);
	}

	function changeSlide(slide: number) {
		stopTimer();
		setCurrentSlide(slide);
		startTimer();
	}

	return (
		<div className="flex relative w-full">
			<div className="overflow-hidden w-full">
				<div
					onMouseOver={stopTimer}
					onMouseLeave={startTimer}
					className="absolute block w-full bg-gray-900 h-[34rem] z-[5] bg-opacity-[.13]"
				></div>
				<div className="flex w-full">
					{slides.map((img, index) => {
						const productImg = cldConfig
							.image(img)
							.format("auto")
							.quality("auto");

						return (
							<div key={index} className="relative min-w-full h-[34rem]">
								<AdvancedImage
									cldImg={productImg}
									className="absolute block w-full object-cover h-[34rem] ease-out duration-1000"
									style={{ transform: `translateX(${-currentSlide * 100}%)` }}
									alt="Carousel"
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div className="absolute left-6 top-14 md:left-16 w-fit z-20">
				<h2 className="text-3xl font-bold text-white mb-2 ">{title}</h2>
				<p className="font-medium text-lg text-white mb-6">{subTitle}</p>
				<Link
					to={"/products"}
					className="btn btn-md rounded-sm h-13 px-6 border-white hover:border-gray-200 hover:bg-gray-200 bg-white text-black shadow-md"
					aria-label="Move to products page"
				>
					<span className="font-semibold text-gray-900">Shop now</span>
				</Link>
			</div>

			<div
				onMouseOver={stopTimer}
				onMouseLeave={startTimer}
				className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20"
			>
				<button
					onClick={toPrevSlide}
					className="btn h-14 w-14 flex items-center justify-center bg-opacity-0 btn-circle border-none hover:bg-opacity-70 hover:bg-gray-900"
					aria-label="Move to previous carousel image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-7 h-7 stroke-white"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
				<button
					onClick={toNextSlide}
					className="btn h-14 w-14 flex items-center justify-center bg-opacity-0 btn-circle border-none hover:bg-opacity-70 hover:bg-gray-900"
					aria-label="Move to next carousel image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-7 h-7 stroke-white"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>

			<div
				onMouseOver={stopTimer}
				onMouseLeave={startTimer}
				className="absolute w-[240px] bg-gray-500 bg-opacity-30 p-2 rounded-full shadow-sm flex items-center justify-center gap-4 -translate-y-1/2 left-1/2 ml-[-120px] bottom-0 z-20"
			>
				{slides.map((_, i: number) => {
					return (
						<CarouselIndicator
							key={i}
							currentSlide={currentSlide}
							toSlide={i}
							changeSlide={changeSlide}
						/>
					);
				})}
			</div>
		</div>
	);
}
