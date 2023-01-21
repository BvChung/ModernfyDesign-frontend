import { ProductInfo } from "../../../types/productTypes";
import { useNavigate } from "react-router-dom";

export default function SearchedProducts({
	_id,
	name,
	setSearchText,
}: ProductInfo) {
	const navigate = useNavigate();

	return (
		<label
			onClick={() => {
				setSearchText!("");
				navigate(`/products/${_id}`);
			}}
			htmlFor="product-search"
			className="flex items-center justify-between p-3 border-b-[1px] border-l-[1px] border-r-[1px] hover:bg-gray-100 first:rounded-t-lg first:border-t-[1px] last:rounded-b-lg cursor-pointer"
			aria-label="Move to product"
		>
			<span>{name}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-7 h-7 -rotate-45"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</label>
	);
}
