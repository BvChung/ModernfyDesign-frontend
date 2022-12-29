import { cldConfig } from "../../../config/cloudinaryConfig";
import { Link } from "react-router-dom";
import {
	AdvancedImage,
	lazyload,
	placeholder,
	responsive,
} from "@cloudinary/react";

interface CategoryProps {
	imgPubId: string;
	title: string;
}

export default function Category({ imgPubId, title }: CategoryProps) {
	const productImg = cldConfig.image(imgPubId).format("auto").quality("auto");

	return (
		<Link
			to="products"
			className="flex justify-center items-center rounded-md shadow-sm w-full"
			aria-label={`Move to ${title} page`}
		>
			<div className="group overflow-hidden w-full relative">
				<AdvancedImage
					cldImg={productImg}
					plugins={[lazyload(), responsive(), placeholder({ mode: "blur" })]}
					className="h-[250px] w-full object-cover hover:scale-105 transition-transform duration-500"
					alt="Product Category"
				/>
				<div className="absolute bottom-4 left-6">
					<span
						className="relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
before:bottom-0 before:left-0 before:bg-white
group-hover:before:scale-x-100 before:scale-x-0 before:origin-top-left
before:transition before:ease-in-out before:duration-300 text-2xl font-semibold text-white"
					>
						{title}
					</span>
				</div>
			</div>
		</Link>
	);
}
