import { useState } from "react";
import { useSearchProducts } from "../../../hooks/products/useSearchProducts";
import SearchedProducts from "./SearchedProducts";

export default function SearchModal() {
	const [searchText, setSearchText] = useState<string>("");
	const {
		refetch,
		data: searchedProducts,
		isSuccess,
		remove,
	} = useSearchProducts();

	return (
		<>
			<div
				onClick={() => {
					refetch();
				}}
				className="tooltip tooltip-bottom z-50"
				data-tip="Search Products"
			>
				<label
					htmlFor="product-search"
					className="btn modal-button btn-ghost btn-circle"
					aria-label="Open search modal"
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
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</label>
			</div>

			<input
				type="checkbox"
				id="product-search"
				className="modal-toggle"
				onChange={(e) => {
					if (!e.target.checked) {
						setSearchText("");
						remove();
					}
				}}
			/>

			<label
				htmlFor="product-search"
				className="modal modal-bottom md:modal-middle cursor-pointer"
			>
				<label className="modal-box relative" htmlFor="">
					<label
						className="btn btn-sm btn-circle absolute right-2 top-2"
						htmlFor="product-search"
						aria-label="Close search modal"
					>
						✕
					</label>

					<h3 className="text-lg font-bold mb-4">Search for products</h3>
					<div className="flex flex-col justify-center w-full">
						<div
							className={`form-control w-full ${
								searchText.length > 0 && "mb-6"
							}`}
						>
							<label className="input-group">
								<input
									type="text"
									placeholder="Search for product name"
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									className="input input-bordered w-full"
									aria-label="Search input"
								/>
								<span>
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
											d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
										/>
									</svg>
								</span>
							</label>
						</div>
						<div
							className={`${
								searchText.length < 0 && "border-[1px] rounded-lg"
							}`}
						>
							{isSuccess &&
								searchedProducts
									.filter((product) => {
										return searchText.length > 0
											? product.name
													.toLowerCase()
													.includes(searchText.toLowerCase())
											: !product;
									})
									.map((product) => {
										return (
											<SearchedProducts
												key={product._id}
												_id={product._id}
												category={product.category}
												description={product.description}
												color={product.color}
												image={product.image}
												imageCloudId={product.imageCloudId}
												name={product.name}
												price={product.price}
												createdBy={product.createdBy}
												setSearchText={setSearchText}
											/>
										);
									})}
						</div>
					</div>
				</label>
			</label>
		</>
	);
}
