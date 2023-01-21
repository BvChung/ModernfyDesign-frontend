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
		<div className="w-full min-w-full fade rounded-md transition-all shadow-md">
			<Link
				to={_id}
				className="card w-full rounded-md h-fit bg-base-100 border-[1px] shadow-sm"
			>
				<div className="overflow-hidden">
					<AdvancedImage
						cldImg={productImg}
						className="h-[200px] w-full rounded-t-md relative object-cover hover:scale-105 transition-transform duration-500"
						alt="Product"
					/>
				</div>

				<div className="card-body gap-0 p-6 hover:bg-gray-50">
					<div className="card-actions mb-3">
						<div className="badge badge-md rounded-full bg-sky-100 text-sky-800 font-bold border-sky-800 border-opacity-30">
							{category}
						</div>
					</div>
					<h2 className="font-semibold mb-2 text-gray-900">{name}</h2>
					<span className="font-semibold text-gray-800 text-lg">
						${price.toFixed(2)}
					</span>
				</div>
			</Link>
		</div>
	);
}
