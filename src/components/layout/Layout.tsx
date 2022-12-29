import { useState } from "react";
import { Suspense } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Nav from "../nav/Nav";
import CheckoutNav from "../nav/CheckoutNav";
import SideBar from "./SideBar";
import Footer from "../footer/Footer";
import { ToastContainer, Flip } from "react-toastify";
import Spinner from "../loading/Spinner";

export default function Layout() {
	const location = useLocation();
	const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

	const footerLocations = ["/products", "/orders", "/cart"];
	const displayFooter =
		location.pathname === "/" ||
		footerLocations.some((el) => location.pathname.includes(el));

	return (
		<div
			className={`drawer ${
				activeSidebar ? "h-screen" : "h-full"
			} min-h-screen min-w-full relative`}
			data-theme="lofi"
		>
			<input
				onChange={(e) => {
					if (e.target.checked) {
						setActiveSidebar(true);
					}

					if (!e.target.checked) {
						setActiveSidebar(false);
					}
				}}
				id="app-drawer"
				type="checkbox"
				className="drawer-toggle"
				aria-label="Open sidebar"
			/>

			<div className="drawer-content flex flex-col justify-between h-full w-full fade">
				{/* <!-- Navbar --> */}
				{!location.pathname.startsWith("/checkout") ? <Nav /> : <CheckoutNav />}

				{/* <!-- Page content here --> */}

				<div className="flex flex-col justify-between h-full mt-16">
					<Suspense fallback={<Spinner />}>
						<Outlet />
					</Suspense>
				</div>

				{displayFooter && <Footer />}

				<ToastContainer
					limit={3}
					autoClose={1500}
					transition={Flip}
					theme={"light"}
					position="top-center"
				/>
			</div>

			<SideBar />

			<ScrollRestoration />
		</div>
	);
}
