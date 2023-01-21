import { Link } from "react-router-dom";
import { OrderPurchasedItems } from "../../interfaces/orderInterface";
import { useCartContext } from "../../hooks/context/useCartContext";
import { cldConfig } from "../../config/cloudinaryConfig";
import { AdvancedImage } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { toast } from "react-toastify";

export default function OrderedItems({
	_id,
	imageCloudId,
	name,
	quantity,
	price,
}: OrderPurchasedItems) {
	const { addCartItem, findCartItem } = useCartContext();

	const productImg = cldConfig
		.image(imageCloudId)
		.format("auto")
		.quality("auto")
		.resize(scale().width(150).height(150));

	return (
		<div
			key={_id}
			className="flex py-6 border-b border-gray-300 last:border-b-0 last:mb-0"
		>
			<Link to={`/products/${_id}`} aria-label="Move to product details">
				<AdvancedImage
					cldImg={productImg}
					className="rounded-md h-32 w-32 object-cover"
					alt="Product"
				/>
			</Link>

			<div className="flex flex-col flex-1 pl-6 w-full">
				<div className="flex flex-grow w-full">
					<div className="hidden md:flex flex-grow gap-10 w-fit mb-3">
						<div className="flex flex-col basis-64">
							<Link
								to={`/products/${_id}`}
								className="hover:link font-semibold mb-1 w-fit"
								aria-label="Move to product details"
							>
								{name}
							</Link>
							<span className="hidden md:flex text-xs text-gray-500 mb-2">
								ITEM {_id.slice(0, 7)}
							</span>
						</div>

						<div className="flex flex-col basis-32">
							<span className="font-semibold mb-3">Price</span>
							<span className="text-sm font-medium">${price.toFixed(2)}</span>
						</div>

						<div className="flex flex-col basis-32">
							<span className="font-semibold mb-3">Quantity</span>
							<span className="text-sm font-medium">{quantity}</span>
						</div>

						<div className="flex flex-col basis-32">
							<span className="font-semibold mb-3">Amount</span>
							<span className="text-sm font-medium">
								${(quantity! * price).toFixed(2)}
							</span>
						</div>
					</div>

					<div className="hidden md:flex">
						<button
							onClick={() => {
								addCartItem({
									_id: _id,
									price: price,
									quantity: 1,
								});

								toast.success(`${name} has been added to your cart.`, {
									position: "bottom-right",
								});
							}}
							className={`btn bg-accent4 border-accent4 hover:border-accent2 hover:bg-accent2 h-11 w-36 rounded-md shadow-md
							 ${
									!findCartItem(_id)?.quantity ||
									findCartItem(_id)?.quantity! < 9
										? ""
										: "btn-disabled"
								}`}
							aria-label="Add item to cart"
						>
							<span className="text-xs">
								{!findCartItem(_id)?.quantity ||
								findCartItem(_id)?.quantity! < 9
									? "Add to Cart"
									: "9 items max"}
							</span>
						</button>
					</div>
				</div>

				<div className="md:hidden flex flex-col justify-center w-full mb-3">
					<Link
						to={`/products/${_id}`}
						className="hover:link font-semibold mb-1 w-fit"
						aria-label="Move to product details"
					>
						{name}
					</Link>
					<span className="hidden md:flex text-xs text-gray-500 mb-2">
						ITEM {_id.slice(0, 7)}
					</span>

					<div className="text-sm mb-2">
						<span className="font-medium mr-1">Price: </span>
						<span className="font-semibold">${price.toFixed(2)}</span>
					</div>

					<div className="text-sm mb-2">
						<span className="font-medium mr-1">Quantity: </span>
						<span className="font-semibold">{quantity}</span>
					</div>

					<div className="text-sm">
						<span className="font-medium mr-1">Amount: </span>
						<span className="font-semibold">
							${(quantity! * price).toFixed(2)}
						</span>
					</div>
				</div>

				<div className="flex md:hidden items-center">
					<button
						onClick={() => {
							addCartItem({
								_id: _id,
								price: price,
								quantity: 1,
							});

							toast.success(`${name} has been added to your cart.`, {
								position: "bottom-right",
							});
						}}
						className={`btn rounded-md ${
							!findCartItem(_id)?.quantity || findCartItem(_id)?.quantity! < 9
								? "btn-info"
								: "btn-disabled"
						} flex items-center h-8 gap-2`}
						aria-label="Add item to cart"
					>
						<span className="text-xs">
							{!findCartItem(_id)?.quantity || findCartItem(_id)?.quantity! < 9
								? "Add to Cart"
								: "9 items max"}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
