import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function AccountPage() {
	const { user } = useAuthContext();

	return (
		<div className="flex flex-col items-center mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center justify-center gap-2 w-full mt-8 mb-6 lg:max-w-3xl xl:max-w-4xl">
				<span className="font-medium text-xl sm:text-2xl">Personal Info</span>
			</div>

			<div className="flex flex-col lg:max-w-3xl xl:max-w-4xl items-center w-full rounded-lg border-[1px] shadow-sm">
				<Link
					to="/account/name"
					className="w-full px-6 rounded-t-lg border-b-[1px] hover:bg-gray-100 cursor-pointer"
					aria-label="Move to edit name page"
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
									className="w-5 h-5 "
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
									/>
								</svg>
								<span className="font-semibold text-xs">Name</span>
							</div>
							<div className="flex basis-96 items-center text-sm">
								{user.firstName} {user.lastName}
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
					to="/account/email"
					className="w-full px-6 border-b-[1px] hover:bg-gray-100 cursor-pointer peer"
					aria-label="Move to edit email page"
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
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>

								<span className="font-semibold text-xs">Email</span>
							</div>
							<div className="flex basis-96 items-center text-sm">
								{user.email}
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
					to="/account/password"
					className="w-full px-6 rounded-b-lg hover:bg-gray-100 cursor-pointer"
					aria-label="Move to edit password page"
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
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>

								<span className="font-semibold text-xs">Password</span>
							</div>
							<div className="flex basis-96 items-center text-sm">********</div>
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
			</div>
		</div>
	);
}
