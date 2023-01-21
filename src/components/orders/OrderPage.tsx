import OrderHistory from "./OrderHistory";
import { Link } from "react-router-dom";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { OrderInfo } from "../../interfaces/orderInterface";
import Spinner from "../loading/Spinner";

export default function OrderPage() {
	const { data: orders, isSuccess, isLoading } = useGetOrders();

	const orderList =
		isSuccess && orders.length !== 0 ? (
			<div className="border-[1px] h-max rounded-lg shadow-sm transition-all fade w-full">
				{isSuccess &&
					orders.map((order: OrderInfo) => {
						return (
							<OrderHistory
								key={order._id}
								_id={order._id}
								createdAt={order.createdAt}
								purchasedItems={order.purchasedItems}
								shippingInfo={order.shippingInfo}
								paymentInfo={order.paymentInfo}
							/>
						);
					})}
			</div>
		) : (
			isSuccess && (
				<div className="flex flex-col items-center justify-center w-full lg:min-w-[1040px] mt-8">
					<div className="flex items-center justify-center gap-3 mb-8">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-7 h-7"
						>
							<path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
							<path
								fillRule="evenodd"
								d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z"
								clipRule="evenodd"
							/>
						</svg>

						<span className="text-gray-800 text-2xl font-semibold">
							You have no recent orders
						</span>
					</div>
					<Link
						to={"/products"}
						className="btn btn-secondary h-11 w-56 md:w-64 rounded-full"
						aria-label="Move to product page"
					>
						Browse our products
					</Link>
				</div>
			)
		);

	return (
		<>
			{!isLoading ? (
				<div className="flex flex-col items-center justify-center mt-8 mb-20 mx-4 sm:mx-6 lg:mx-0">
					<div className="flex items-center gap-2 w-full mb-6 lg:max-w-5xl xl:max-w-6xl">
						<span className="font-medium text-xl text-gray-800">My Orders</span>
					</div>

					<div className="flex justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-6xl">
						{orderList}
					</div>
				</div>
			) : (
				<Spinner minHeight="min-h-screen" />
			)}
		</>
	);
}
