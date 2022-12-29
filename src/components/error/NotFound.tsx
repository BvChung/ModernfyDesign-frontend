import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="flex items-center mb-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-7 h-7 mr-2 stroke-red-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
					/>
				</svg>

				<p className="text-lg">This page was not found.</p>
			</div>
			<button
				onClick={() => {
					navigate(-1);
				}}
				className="btn btn-outline btn-secondary rounded-full h-12 w-32"
				aria-label="Clear all filters"
			>
				<span className="normal-case font-bold text-base">Return</span>
			</button>
		</div>
	);
}
