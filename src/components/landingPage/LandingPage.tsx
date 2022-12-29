import { carouselData, categoryData } from "../../config/images";
import Category from "./display/Category";
import Carousel from "./display/Carousel";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-w-full w-full gap-2 items-center justify-center">
			<div className="w-full min-w-full mb-16">
				<Carousel slides={carouselData.slides} />
			</div>

			<div className="w-full flex flex-col items-center justify-center mb-16">
				<h1 className="font-medium text-3xl mb-6">Minimal and Aesthetic</h1>
				<p className="">Explore our unique line of collections.</p>
			</div>

			<div className="w-full h-fit sm:max-w-6xl md:max-w-7xl grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-16">
				{categoryData.map((el) => {
					return (
						<Category key={el.id} imgPubId={el.imgPubId} title={el.title} />
					);
				})}
			</div>
		</div>
	);
}
