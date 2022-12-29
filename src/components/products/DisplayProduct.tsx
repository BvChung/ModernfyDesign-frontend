import { Link } from "react-router-dom";
import { ProductInfo } from "../../interfaces/productInterface";
import { cldConfig } from "../../config/cloudinaryConfig";
import { scale } from "@cloudinary/transformation-builder-sdk/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

export default function DisplayProduct({
	_id,
	name,
	price,
	category,
	imageCloudId,
}: ProductInfo) {
	const productImg = cldConfig
		.image(imageCloudId)
		.format("auto")
		.quality("auto")
		.resize(scale().width(600).height(600));
	return (
		<div className="w-full min-w-full fade transition-all">
			<Link
				to={_id}
				className="card w-full rounded-md h-fit bg-base-100 border-[1px] shadow-sm"
			>
				<div className="overflow-hidden">
					<AdvancedImage
						cldImg={productImg}
						className="h-[200px] w-full relative object-cover hover:scale-105 transition-transform duration-500"
						alt="Product"
					/>
				</div>

				<div className="card-body p-5">
					<div className="card-actions">
						<div className="badge badge-sm badge-outline">{category}</div>
					</div>
					<h2 className="font-semibold">{name}</h2>
					<span className="font-semibold text-gray-900">
						${price.toFixed(2)}
					</span>
				</div>
			</Link>
		</div>
	);
}
