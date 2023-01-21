import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../hooks/context/useCartContext";
import { CartItemInfo } from "../../types/cartTypes";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import CartItem from "./CartItem";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { guestDemoInfo, adminDemoInfo } from "../../config/demoInfo";
import Spinner from "../loading/Spinner";

export default function CartPage() {
	const { user } = useAuthContext();
	const { myCart, cartItemsInfo } = useCartContext();
	const { setMyOrder } = useOrderContext();
	const navigate = useNavigate();
	const { data: cartItems, isSuccess, isLoading } = useGetCartItems(myCart);

	const displayCart =
		isSuccess &&
		cartItems.map((item: CartItemInfo) => {
			return (
				<CartItem
					key={item._id}
					_id={item._id}
					name={item.name}
					category={item.category}
					description={item.description}
					color={item.color}
					image={item.image}
					imageCloudId={item.imageCloudId}
					price={item.price}
				/>
			);
		});

	const guestAccountActive =
		user.email === process.env.REACT_APP_GUEST_EMAIL ||
		user.email === process.env.REACT_APP_GUEST_ADMIN_EMAIL;

	return (
		<div className="flex flex-col items-center justify-center mt-8 mb-20 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center gap-2 w-full mb-6 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-medium text-xl sm:text-2xl">My Cart</span>
			</div>

			<div className="flex flex-col md:flex-row justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-6xl">
				<div className="border-[1px] px-7 h-max rounded-lg shadow-sm transition-all w-full md:w-2/3 mb-4 md:mb-0">
					{cartItems?.length === 0 && (
						<div className="flex flex-col items-center justify-center gap-8 h-[262px]">
							<div className="flex items-center justify-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-7 h-7"
								>
									<path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
								</svg>

								<span className="text-gray-800 text-2xl font-semibold">
									Your cart is empty
								</span>
							</div>
							<Link
								to={"/products"}
								className="btn btn-secondary h-11 px-10 rounded-md shadow-md"
								aria-label="Move to products page"
							>
								Browse our products
							</Link>
						</div>
					)}

					{!isLoading ? (
						displayCart
					) : (
						<div className="h-[262px]">
							<Spinner />
						</div>
					)}
				</div>

				<div className="flex flex-col items-center md:sticky top-6 rounded-lg shadow-sm h-fit w-full md:w-1/3 border-[1px] py-4 md:py-6 px-4">
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
						<span className="font-semibold">TBD</span>
					</div>

					<div className="w-full flex items-center justify-between mb-2">
						<div className="font-semibold">Estimated Total</div>
						<div className="font-bold">
							${cartItemsInfo.subTotal.toFixed(2)}
						</div>
					</div>

					<div className="w-full flex items-center justify-between mb-6">
						<span className="font-medium text-xs text-gray-500">
							Taxes calculated during checkout
						</span>
					</div>

					<div className="w-full">
						<Link
							className={`btn bg-accent4 border-accent4 hover:border-accent2 hover:bg-accent2 
							h-11 rounded-md shadow-md w-full 
							${cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn-info"}`}
							to={"/checkout/shipping"}
							aria-label="Move to checkout page"
						>
							Continue to checkout
						</Link>
					</div>

					{guestAccountActive && (
						<div className="w-full border-t-[1px] mt-4">
							<button
								className={`btn btn-secondary h-11 rounded-md shadow-md mt-4 w-full 
								${cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn-outline btn-primary"}`}
								onClick={() => {
									if (user.email === process.env.REACT_APP_GUEST_EMAIL) {
										setMyOrder(guestDemoInfo);
									} else if (
										user.email === process.env.REACT_APP_GUEST_ADMIN_EMAIL
									) {
										setMyOrder(adminDemoInfo);
									}

									navigate("/checkout/confirmation");
								}}
								aria-label="Checkout with demo info"
							>
								Checkout with demo info
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
