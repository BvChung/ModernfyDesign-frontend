import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetOrderInfo } from "../../hooks/orders/useGetOrderInfo";
import OrderedItems from "./OrderedItems";
import Spinner from "../loading/Spinner";
import { useDeleteOrder } from "../../hooks/orders/useDeleteOrder";

export default function OrderInfo() {
	const params = useParams();
	const { data: orderInfo, isLoading, isSuccess } = useGetOrderInfo(params.id!);
	const { mutate } = useDeleteOrder(params.id!);
	const datePurchased = new Date(orderInfo?.createdAt!)
		.toDateString()
		.split(" ");

	return (
		<>
			{!isLoading ? (
				isSuccess && (
					<div className="flex flex-col items-center justify-center mt-8 mb-16 mx-4 lg:mx-0">
						<div className="flex items-center justify-between gap-2 w-full mb-6 pb-2 border-b-[1px] border-gray-200 lg:max-w-5xl xl:max-w-6xl">
							<div className="flex items-center">
								<Link
									to={"/orders"}
									className="mr-3 cursor-pointer"
									aria-label="Return to order list page"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
										/>
									</svg>
								</Link>
								<span className="font-medium text-xl sm:text-2xl">
									Order Number: {orderInfo?._id}
								</span>
							</div>

							<div
								className="tooltip tooltip-left md:tooltip-bottom"
								data-tip="Delete order"
							>
								<button
									onClick={() => {
										mutate();
									}}
									className="btn btn-ghost btn-circle"
									aria-label="Delete order"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className="lg:max-w-5xl xl:max-w-6xl w-full mb-6">
							<div className="flex w-full justify-start gap-14">
								<div className="flex flex-col justify-center">
									<div className="flex items-center gap-2 mb-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
											/>
										</svg>
										<span className="text-gray-800 text-lg font-medium">
											Order Placed
										</span>
									</div>
									<span className="font-semibold">
										{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
									</span>
								</div>
								<div className="flex flex-col justify-center">
									<div className="flex items-center gap-2 mb-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
											/>
										</svg>
										<span className="text-gray-800 text-lg font-medium">
											Delivered
										</span>
									</div>
									<span className="font-semibold text-emerald-600">
										{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
									</span>
								</div>
							</div>
						</div>

						<div className="flex flex-1 flex-col md:flex-row justify-between w-full gap-4 lg:max-w-5xl xl:max-w-6xl border-[1px] p-6 mb-8 rounded-lg shadow-sm">
							<div className="flex flex-col justify-end border-b-[1px] border-gray-600 pb-6 mb-2 md:pb-0 md:border-0 md:mb-0 md:basis-60">
								<h3 className="font-semibold mb-2 pb-1 border-b-[1px]">
									Billing Information
								</h3>
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium">
										Subtotal ({orderInfo?.purchasedItems.length} item
										{orderInfo?.purchasedItems.length! > 1 && "s"})
									</span>
									<span className="font-medium">
										${orderInfo?.paymentInfo.subTotal}
									</span>
								</div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium">Shipping</span>
									<span className="font-medium">Free</span>
								</div>
								<div className="flex items-center justify-between mb-3 pb-1 border-b-[1px]">
									<span className="text-sm font-medium">Tax</span>
									<span className="font-medium">
										${(orderInfo?.paymentInfo.subTotal! * 0.0625).toFixed(2)}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="font-semibold">Total</span>
									<span className="font-bold">
										$
										{(
											orderInfo?.paymentInfo.subTotal! +
											orderInfo?.paymentInfo.subTotal! * 0.0625
										).toFixed(2)}
									</span>
								</div>
							</div>

							<div className="flex flex-col  border-b-[1px] border-gray-600 pb-6 mb-2 md:pb-0 md:border-0 md:mb-0 md:basis-60">
								<h3 className="font-semibold mb-2 pb-1 border-b-[1px]">
									Payment Method
								</h3>

								<div>
									<span className="font-medium">Card ending in </span>
									<span className="font-semibold">
										{orderInfo?.paymentInfo.cardNumber.substring(
											orderInfo?.paymentInfo.cardNumber.length - 4,
											orderInfo?.paymentInfo.cardNumber.length
										)}
									</span>
								</div>
							</div>

							<div className="flex flex-col  md:basis-60">
								<h3 className="font-semibold mb-2 pb-1 border-b-[1px]">
									Shipped to
								</h3>
								<span className="font-medium mb-2">
									{orderInfo?.shippingInfo.firstName}{" "}
									{orderInfo?.shippingInfo.lastName}
								</span>
								<span className="font-medium mb-2">
									{orderInfo?.shippingInfo.address}
								</span>
								<span className="font-medium mb-2">
									{orderInfo?.shippingInfo.city},{" "}
									{orderInfo?.shippingInfo.state}{" "}
									{orderInfo?.shippingInfo.zipCode}
								</span>
							</div>
						</div>

						<div className="h-fit w-full border-[1px] rounded-lg shadow-sm lg:max-w-5xl xl:max-w-6xl px-4">
							{orderInfo?.purchasedItems.map((item) => {
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
				)
			) : (
				<Spinner minHeight="min-h-screen" />
			)}
		</>
	);
}
