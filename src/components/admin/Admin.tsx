import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { accessRoles } from "../../config/accessRoles";

export default function Admin() {
	const { user } = useAuthContext();

	return (
		<div className="flex flex-col items-center mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center justify-center gap-2 w-full mt-8 mb-6 lg:max-w-3xl xl:max-w-4xl">
				<span className="font-medium text-xl sm:text-2xl">Admin</span>
			</div>

			<div className="flex flex-col lg:max-w-3xl xl:max-w-4xl items-center w-full rounded-lg border-[1px] shadow-sm">
				<Link
					to={"inventory"}
					className="w-full px-6 rounded-t-lg  border-b-[1px] hover:bg-gray-100 cursor-pointer"
					aria-label="Move to inventory page"
				>
					<div className="flex items-center justify-center py-6">
						<div className="flex flex-1">
							<div className="flex items-center gap-3 basis-44 mr-6">
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
										d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
									/>
								</svg>

								<span className="font-semibold text-xs">Inventory</span>
							</div>
							<div className="flex basis-96 items-center text-sm">
								Manage inventory
							</div>
						</div>
						<div className="ml-4">
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
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Link>

				<Link
					to={"create"}
					className="w-full px-6 hover:bg-gray-100 cursor-pointer"
					aria-label="Move to product creation page"
				>
					<div className="flex items-center justify-center py-6 ">
						<div className="flex flex-1">
							<div className="flex items-center gap-3 basis-44 mr-6">
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
										d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								<span className="font-semibold text-xs">Create</span>
							</div>
							<div className="flex basis-96 items-center text-sm">
								Create a new product
							</div>
						</div>
						<div className="ml-4">
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
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Link>

				{user.role === accessRoles.Admin && (
					<Link
						to={"manage"}
						className="w-full px-6 rounded-b-lg border-t-[1px] hover:bg-gray-100 cursor-pointer"
						aria-label="Move to account management page"
					>
						<div className="flex items-center justify-center py-6 ">
							<div className="flex flex-1">
								<div className="flex items-center gap-3 basis-44 mr-6">
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
											d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
										/>
									</svg>

									<span className="font-semibold text-xs">Users</span>
								</div>
								<div className="flex basis-96 items-center text-sm">
									Manage users
								</div>
							</div>
							<div className="ml-4">
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
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}
