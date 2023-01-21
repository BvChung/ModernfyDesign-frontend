import { OrderInfo } from "../../types/orderTypes";
import { Link } from "react-router-dom";
import OrderedItems from "./OrderedItems";

export default function OrderHistory({
	_id,
	createdAt,
	purchasedItems,
	shippingInfo,
	paymentInfo,
}: OrderInfo) {
	const datePurchased = new Date(createdAt!).toDateString().split(" ");

	return (
		<div className="flex flex-col items-center w-full h-fit border-b-[1px] last:border-b-0 ">
			<div className="flex flex-col md:flex-row flex-1 justify-between w-full py-6 px-6 border-b-[1px] bg-gray-100 first:rounded-t-lg">
				<div className="hidden items-center w-full mb-4 md:mb-0 md:flex">
					<div className="flex flex-col items-center md:items-baseline justify-center gap-[2px] basis-60">
						<span className="uppercase font-medium text-sm text-gray-900">
							Order Date
						</span>
						<span className="text-sm text-gray-900">
							{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
						</span>
					</div>
					<div className="flex flex-col items-center md:items-baseline gap-[2px] basis-60 w-fit">
						<span className="uppercase font-medium text-sm text-gray-900">
							Total
						</span>
						<span className="text-sm text-gray-900">
							${paymentInfo.subTotal.toFixed(2)}
						</span>
					</div>
					<div className="flex flex-col items-center md:items-baseline gap-[2px] basis-60 w-fit">
						<span className="uppercase font-medium text-sm text-gray-900">
							Shipped to
						</span>
						<span className="text-sm text-gray-900">
							{shippingInfo.firstName} {shippingInfo.lastName}
						</span>
					</div>
				</div>

				<div className="flex flex-col gap-1 items-start md:items-end justify-end w-full">
					<div className="text-sm text-gray-900">
						<span className="font-semibold mr-1">Order#:</span>
						<span className="font-medium ">{_id}</span>
					</div>

					<div className="md:hidden text-sm text-gray-900">
						<span className="font-semibold mr-1">Order Date:</span>
						<span className="font-medium ">
							{" "}
							{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
						</span>
					</div>

					<Link
						to={`${_id}`}
						className="font-bold text-sm text-gray-800 hover:text-gray-900 hover:link"
						aria-label="Move to order details"
					>
						View Details
					</Link>
				</div>
			</div>
			<div className="h-fit w-full px-4 md:px-7">
				{purchasedItems.map((item) => {
					return (
						<OrderedItems
							key={item._id}
							_id={item._id}
							category={item.category}
							description={item.description}
							color={item.color}
							image={item.image}
							imageCloudId={item.imageCloudId}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
						/>
					);
				})}
			</div>
		</div>
	);
}
