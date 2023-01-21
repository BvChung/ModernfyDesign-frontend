import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryProducts } from "../../hooks/products/useQueryProducts";
import { ProductInfo } from "../../interfaces/productInterface";
import DisplayProduct from "./DisplayProduct";
import Spinner from "../loading/Spinner";
import FiltersModal from "./modal/FiltersModal";
import { useSearchParams } from "react-router-dom";
import { QueryProducts } from "../../interfaces/productInterface";

export default function ProductPage() {
	const navigate = useNavigate();
	let [searchParams, setSearchParams] = useSearchParams();
	const [filter, setFilter] = useState<QueryProducts>({
		category: [],
		priceLow: 0,
		priceHigh: 0,
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		category: string
	) {
		// Add category to query array when checked
		// Remove category from query array when unchecked

		if (e.target.checked) {
			setFilter((prev) => {
				return {
					...prev,
					category: [...prev.category, category],
				};
			});
		} else {
			setFilter((prev) => {
				return {
					...prev,
					category: prev.category.filter((el) => el !== category),
				};
			});
		}
	}

	useEffect(() => {
		if (filter.priceLow && filter.priceHigh) {
			setSearchParams((prev) => {
				return {
					...prev,
					filters: filter.category.map((el) => el.toLowerCase()),
					pl: filter.priceLow,
					ph: filter.priceHigh,
				};
			});
		} else if (!filter.priceLow && !filter.priceHigh) {
			setSearchParams((prev) => {
				return {
					...prev,
					filters: filter.category.map((el) => el.toLowerCase()),
				};
			});
		}
	}, [filter, setSearchParams]);

	const { isSuccess, data: products, isLoading } = useQueryProducts(filter);

	const displayProducts =
		isSuccess && products.length !== 0 ? (
			<div
				className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-w-full
				sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] h-fit
			gap-8 w-full sm:justify-center"
			>
				{products.map((product: ProductInfo) => {
					return (
						<DisplayProduct
							key={product._id}
							_id={product._id}
							name={product.name}
							description={product.description}
							color={product.color}
							price={product.price}
							category={product.category}
							image={product.image}
							imageCloudId={product.imageCloudId}
							createdBy={product.createdBy}
						/>
					);
				})}
			</div>
		) : (
			isSuccess && (
				<div className="flex flex-col items-center justify-center w-full lg:min-w-[1040px] mb-9">
					<h1 className="font-bold text-gray-800 text-3xl mb-6">
						We couldn't find a match
					</h1>
					<p className="text-base mb-6">
						Let's reset your filters and try again
					</p>
					<button
						onClick={() => {
							navigate(0);
						}}
						className="btn btn-secondary h-11 rounded-full"
						aria-label="Clear all filters"
					>
						Clear filters
					</button>
				</div>
			)
		);

	return (
		<div className="flex justify-center mt-8 mb-20 w-full min-w-full h-full">
			<div className="flex flex-col w-full min-h-screen lg:max-w-6xl xl:max-w-7xl mx-4 sm:mx-6 lg:mx-0">
				<div className="flex gap-2 justify-start w-full lg:max-w-3xl xl:max-w-4xl mb-6">
					<FiltersModal handleChange={handleChange} setFilter={setFilter} />
				</div>

				{!isLoading ? (
					<div className="flex justify-center w-full">{displayProducts}</div>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
}
