import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";

export default function CheckoutNav() {
	const { clearMyOrder } = useOrderContext();
	const navigate = useNavigate();

	return (
		<nav className="navbar min-w-full fixed flex bg-white justify-between z-30 h-14 px-4 border-b-[1px]">
			<div className="tooltip tooltip-bottom z-20" data-tip="Return">
				<label
					htmlFor="return-modal"
					className="btn btn-ghost btn-circle modal-button"
					aria-label="Return to cart page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</label>
			</div>

			<input type="checkbox" id="return-modal" className="modal-toggle" />

			<label
				htmlFor="return-modal"
				className="modal modal-bottom sm:modal-middle cursor-pointer"
			>
				<label className="modal-box relative" htmlFor="">
					<label
						className="btn btn-sm btn-circle absolute right-2 top-2"
						htmlFor="return-modal"
						aria-label="Close order cancellation modal"
					>
						✕
					</label>

					<h3 className="text-lg font-bold text-gray-900">
						Confirm cancellation
					</h3>
					<p className="py-4 text-gray-800">
						You will have to start over again if you leave the checkout page.
					</p>
					<div className="modal-action items-center justify-end gap-4 mt-8">
						<label
							htmlFor="return-modal"
							className="btn btn-sm btn-secondary btn-outline h-11 px-4 text-sm rounded-md normal-case"
							aria-label="Continue checking out"
						>
							Continue
						</label>

						<label
							htmlFor="return-modal"
							className="btn px-4 rounded-md bg-red-700 border-red-700 hover:bg-red-600 hover:border-red-600    h-11 w-26 normal-case"
							onClick={() => {
								navigate("/cart");
								clearMyOrder();
							}}
							aria-label="Cancel order"
						>
							Cancel order
						</label>
					</div>
				</label>
			</label>
		</nav>
	);
}
