import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useCreateOrder } from "../../hooks/orders/useCreateOrder";

export default function ReviewOrder() {
	const { user } = useAuthContext();
	const { myOrder, clearMyOrder } = useOrderContext();
	const { myCart, cartItemsInfo } = useCartContext();
	const { mutate } = useCreateOrder();
	const navigate = useNavigate();
	const { data: displayCartItems } = useGetCartItems(myCart);

	const orderDetails = displayCartItems && {
		accountId: user._id,
		...myOrder,
		// Pair quantity in cart with item
		purchasedItems: displayCartItems!
			.sort((a, b) => {
				if (a._id < b._id) {
					return -1;
				}
				if (a._id > b._id) {
					return 1;
				}
				return 0;
			})
			.map((product, i: number) => {
				if (product._id === myCart[i]._id) {
					return {
						...product,
						quantity: myCart[i].quantity,
					};
				} else {
					return { ...product };
				}
			}),
		paymentInfo: {
			...myOrder.paymentInfo,
			subTotal: +cartItemsInfo.grandTotal,
		},
	};

	useEffect(() => {
		if (!myOrder.completedPaymentForm || !myOrder.completedShippingForm) {
			navigate("/cart");
			clearMyOrder();
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center mb-10 mt-8 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex flex-col w-full mb-10 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-medium text-xl sm:text-2xl mb-2 sm:mb-0">
					Review Order
				</span>
				<div className="text-sm breadcrumbs mb-4 hidden sm:inline-flex">
					<ul>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
								/>
							</svg>

							<Link
								to="/cart"
								className="hover:link"
								aria-label="Move to cart page"
							>
								<span>Cart</span>
							</Link>
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>
							<Link
								to="/checkout/shipping"
								className="hover:link"
								aria-label="Move to shipping page"
							>
								Shipping
							</Link>
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
								/>
							</svg>
							<Link
								to="/checkout/payment"
								className="hover:link"
								aria-label="Move to payment page"
							>
								Payment
							</Link>
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>

							<span className="font-semibold underline">Review order</span>
						</li>
					</ul>
				</div>

				<div className="flex flex-col lg:flex-row justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-7xl">
					<div className="flex flex-col border-[1px] p-4 h-max rounded-lg shadow-sm mb-2 transition-all fade w-full lg:w-2/3 lg:max-w-3xl">
						<div className="relative flex flex-col lg:flex-row items-center justify-between border-b-[1px] border-gray-300 py-4 mb-0 lg:mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8 stroke-green-600 absolute left-0 lg:hidden"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div className="flex gap-2 items-center mb-4 lg:mb-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 stroke-green-600 hidden lg:inline-flex"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								<span className="font-medium text-lg lg:text-2xl">
									Delivery Date
								</span>
							</div>

							<div className="flex items-center justify-between w-full lg:w-auto">
								<div className="flex flex-col w-36 justify-between items-end mr-6 lg:mr-8 text-xs lg:text-base">
									<span className="text-sm text-gray-500">Arrival</span>
								</div>
								<div className="flex flex-col">
									<div className="flex gap-4">
										<div className="flex flex-col w-48 lg:w-[232px] font-base lg:font-medium text-sm lg:text-base">
											<span className="">Arriving tomorrow</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row justify-between items-center border-b-[1px] border-gray-300 py-4 mb-4">
							<div className="relative flex lg:hidden w-full justify-center items-center font-medium text-lg lg:text-xl mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-8 h-8 stroke-green-600 absolute left-0 lg:hidden"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="w-full flex items-center justify-center">
									<span className="font-medium text-lg lg:text-2xl">
										Shipping to
									</span>
								</div>
								<Link
									to={"/checkout/shipping"}
									className="absolute right-0 h-fit"
									aria-label="Edit shipping info"
								>
									<span className="hover:link text-sm">Edit</span>
								</Link>
							</div>
							<div className="flex items-center gap-2 lg:basis-48">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 stroke-green-600 hidden lg:inline-flex"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								<div className="font-medium text-lg lg:text-2xl hidden lg:inline-flex">
									Shipping to
									<Link
										to={"/checkout/shipping"}
										className="hover:link text-sm inline-flex mt-2 lg:hidden"
										aria-label="Edit shipping info"
									>
										Edit
									</Link>
								</div>
							</div>

							<div className="flex w-full lg:w-auto justify-between">
								<div className="flex flex-col w-36 justify-between items-end mr-6 lg:mr-8 text-xs lg:text-base">
									<span className="text-gray-500 text-sm">
										Delivery address
									</span>
									<span className="text-gray-500 text-sm">Email</span>
								</div>
								<div className="flex flex-col">
									<div className="flex gap-4">
										<div className="flex flex-col w-48 max-w-[12rem] gap-2 font-base lg:font-medium text-sm lg:text-base">
											<p className="text-clip">
												{myOrder.shippingInfo.firstName}{" "}
												{myOrder.shippingInfo.lastName}
											</p>
											<p className="text-clip">
												{myOrder.shippingInfo.address}
											</p>
											<p className="text-clip">
												{myOrder.shippingInfo.city},{" "}
												{myOrder.shippingInfo.state}{" "}
												{myOrder.shippingInfo.zipCode}
											</p>
											<p>{myOrder.shippingInfo.email}</p>
										</div>
									</div>
								</div>
								<Link
									to={"/checkout/shipping"}
									className="hover:link ml-4 text-sm hidden lg:inline-flex"
									aria-label="Edit shipping info"
								>
									Edit
								</Link>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row justify-between items-center py-4">
							<div className="relative flex lg:hidden w-full justify-center items-center font-semibold text-lg lg:text-xl mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-8 h-8 stroke-green-600 absolute left-0 lg:hidden"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="w-full flex items-center justify-center">
									<span className="font-medium text-lg lg:text-2xl">
										Paying with
									</span>
								</div>
								<Link
									to={"/checkout/payment"}
									className="absolute right-0 hover:link text-sm"
									aria-label="Edit payment info"
								>
									Edit
								</Link>
							</div>
							<div className="items-center gap-2 lg:basis-48 hidden lg:inline-flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-11 h-11 stroke-green-600"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								<div className="font-medium text-lg lg:text-2xl">
									Paying with
									<Link
										to={"/checkout/payment"}
										className="hover:link text-sm inline-flex mt-2 lg:hidden"
										aria-label="Edit payment info"
									>
										Edit
									</Link>
								</div>
							</div>

							<div className="flex w-full lg:w-auto justify-between">
								<div className="flex flex-col w-36 justify-between items-end mr-6 lg:mr-8 text-xs lg:text-base">
									<span className="text-gray-500 text-sm">Card number</span>
									<span className="text-gray-500 text-sm">Name on card</span>
									<span className="text-gray-500 text-sm">Expiration</span>
								</div>
								<div className="flex flex-col">
									<div className="flex gap-4">
										<div className="flex flex-col w-48 gap-2 font-base lg:font-medium text-sm lg:text-base">
											<span>
												Ending in{" "}
												{myOrder.paymentInfo.cardNumber.slice(
													myOrder.paymentInfo.cardNumber.length - 4,
													myOrder.paymentInfo.cardNumber.length
												)}
											</span>
											<span>
												{myOrder.paymentInfo.cardHolderFirstName}{" "}
												{myOrder.paymentInfo.cardHolderLastName}
											</span>

											<span>
												{myOrder.paymentInfo.expiryDateMonth}/20
												{myOrder.paymentInfo.expiryDateYear}
											</span>
										</div>
									</div>
								</div>
								<Link
									to={"/checkout/payment"}
									className="hover:link ml-4 text-sm hidden lg:inline-flex"
									aria-label="Edit payment info"
								>
									Edit
								</Link>
							</div>
						</div>
					</div>

					<div className="rounded-lg shadow-sm h-fit w-full lg:w-1/3 border-[1px] py-6 px-4 flex flex-col items-center">
						<div className="w-full flex items-center justify-between mb-4">
							<div>
								<span className="font-medium mr-2 text-sm">Subtotal</span>
								<span className="text-gray-700 text-sm">
									({cartItemsInfo.numItems} items)
								</span>
							</div>
							<div className="font-semibold">
								${cartItemsInfo.subTotal.toFixed(2)}
							</div>
						</div>

						<div className="w-full flex items-center justify-between mb-4">
							<span className="font-medium text-sm">Shipping & Handling</span>
							<span className="font-semibold">Free</span>
						</div>

						<div className="w-full flex items-center justify-between border-b-[1px] border-gray-400 pb-2 mb-4">
							<span className="font-medium text-sm">Taxes</span>
							<span className="font-semibold">
								${cartItemsInfo.tax.toFixed(2)}
							</span>
						</div>

						<div className="w-full flex items-center justify-between mb-6">
							<div className="font-semibold">Grand Total</div>
							<div className="font-bold">
								${cartItemsInfo.grandTotal.toFixed(2)}
							</div>
						</div>

						<button
							onClick={() => {
								mutate(orderDetails!);
							}}
							className="btn btn-info h-11 w-full rounded-full"
							aria-label="Place order"
						>
							Place order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
