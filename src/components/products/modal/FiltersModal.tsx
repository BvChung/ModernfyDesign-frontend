import { useNavigate } from "react-router-dom";
import { FilterFunctions } from "../../../types/productTypes";

export default function FilterModal({
	handleChange,
	setFilter,
}: FilterFunctions) {
	const navigate = useNavigate();

	return (
		<>
			<label
				htmlFor="filters-modal"
				className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-black border-0 rounded-full shadow-sm px-5 h-9"
				aria-label="Open filter modal"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 mr-2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
					/>
				</svg>

				<span className="text-sm font-medium">Filters</span>
			</label>

			<input type="checkbox" id="filters-modal" className="modal-toggle" />

			<label
				htmlFor="filters-modal"
				className="modal modal-bottom sm:modal-middle cursor-pointer"
			>
				<label className="modal-box relative" htmlFor="">
					<label
						className="btn btn-sm btn-circle absolute right-2 top-2"
						htmlFor="filters-modal"
						aria-label="Close filter modal"
					>
						✕
					</label>

					<h3 className="text-center text-lg font-bold mb-4">Filters</h3>

					<div className="collapse collapse-arrow border-t border-base-300 bg-base-100 h-fit w-full">
						<input
							type="checkbox"
							className="peer"
							aria-label="Open category filter"
						/>
						<div className="collapse-title font-semibold peer-hover:underline">
							Category
						</div>
						<div className="h-fit collapse-content">
							<div className="grid grid-cols-3 gap-x-2 gap-y-3 h-fit text-sm">
								<div className="flex items-center gap-2">
									<input
										onChange={(e) => {
											handleChange(e, "Sofa");
										}}
										id="sofa"
										name="sofa"
										type="checkbox"
										className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
										aria-label="Filter for sofas"
									/>
									<span>Sofa</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										onChange={(e) => {
											handleChange(e, "Table");
										}}
										autoComplete="off"
										type="checkbox"
										className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
										aria-label="Filter for tables"
									/>
									<span>Table</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										onChange={(e) => {
											handleChange(e, "Chair");
										}}
										autoComplete="off"
										type="checkbox"
										className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
										aria-label="Filter for chairs"
									/>
									<span>Chair</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										onChange={(e) => {
											handleChange(e, "Desk");
										}}
										autoComplete="off"
										type="checkbox"
										className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
										aria-label="Filter for desks"
									/>
									<span>Desk</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										onChange={(e) => {
											handleChange(e, "Drawer");
										}}
										autoComplete="off"
										type="checkbox"
										className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
										aria-label="Filter for drawers"
									/>
									<span>Drawer</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										onChange={(e) => {
											handleChange(e, "Shelf");
										}}
										autoComplete="off"
										type="checkbox"
										className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
										aria-label="Filter for shelves"
									/>
									<span>Shelf</span>
								</div>
							</div>
						</div>
					</div>

					<div className="collapse collapse-arrow border-y border-base-300 bg-base-100 h-fit w-full">
						<input
							type="checkbox"
							className="peer"
							aria-label="Open price filter"
						/>
						<div className="collapse-title font-semibold peer-hover:underline">
							Price Range
						</div>

						<div className="h-fit collapse-content">
							<div className="grid grid-cols-2 gap-x-2 gap-y-3 h-fit text-sm">
								<div className="flex items-center gap-2">
									<input
										type="radio"
										name="filterPrice"
										onChange={(e) => {
											if (e.target.checked) {
												setFilter((prev) => {
													return {
														...prev,
														priceLow: "min",
														priceHigh: 100,
													};
												});
											}
										}}
										className="radio radio-sm radio-secondary border-2 border-gray-500"
										aria-label="Filter price under $100"
									/>
									<span>Under $100</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="radio"
										name="filterPrice"
										onChange={(e) => {
											if (e.target.checked) {
												setFilter((prev) => {
													return {
														...prev,
														priceLow: 100,
														priceHigh: 500,
													};
												});
											}
										}}
										className="radio radio-sm radio-secondary border-2 border-gray-500"
										aria-label="Filter price between $100 to $500"
									/>

									<span>$100 to $500</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="radio"
										name="filterPrice"
										onChange={(e) => {
											if (e.target.checked) {
												setFilter((prev) => {
													return {
														...prev,
														priceLow: 500,
														priceHigh: 1000,
													};
												});
											}
										}}
										className="radio radio-sm radio-secondary border-2 border-gray-500"
										aria-label="Filter price between $500 to $1000"
									/>
									<span>$500 to $1000</span>
								</div>
								<div className="flex items-center gap-2">
									<input
										type="radio"
										name="filterPrice"
										onChange={(e) => {
											if (e.target.checked) {
												setFilter((prev) => {
													return {
														...prev,
														priceLow: 1000,
														priceHigh: "max",
													};
												});
											}
										}}
										className="radio radio-sm radio-secondary border-2 border-gray-500"
										aria-label="Filter price above $1000"
									/>
									<span>$1000 and above</span>
								</div>
							</div>
						</div>
					</div>

					<div className="modal-action mt-8 justify-between items-center gap-4">
						<label
							htmlFor="filters-modal"
							className="hover:link text-sm"
							onClick={() => {
								navigate(0);
							}}
							aria-label="Clear all filters"
						>
							Clear all
						</label>
						<label
							htmlFor="filters-modal"
							className="btn btn-primary h-11 px-6 rounded-md normal-case"
							aria-label="Show results"
						>
							Show results
						</label>
					</div>
				</label>
			</label>
		</>
	);
}
