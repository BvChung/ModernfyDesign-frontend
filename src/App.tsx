import { lazy } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Outlet,
	createRoutesFromElements,
	redirect,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import PersistLogin from "./components/protected/PersistLogin";
import RequireAuth from "./components/protected/RequireAuth";
import NotFound from "./components/error/NotFound";
import { accessRoles } from "./config/accessRoles";
import { useAuthContext } from "./hooks/context/useAuthContext";
import "react-toastify/dist/ReactToastify.css";

const Cart = lazy(() => import("./components/cart/Cart"));
const OrderPage = lazy(() => import("./components/orders/OrderPage"));
const ProductInfo = lazy(() => import("./components/products/ProductInfo"));
const OrderInfo = lazy(() => import("./components/orders/OrderInfo"));
const Payment = lazy(() => import("./components/checkout/Payment"));
const Shipping = lazy(() => import("./components/checkout/Shipping"));
const ReviewOrder = lazy(() => import("./components/checkout/ReviewOrder"));
const SignIn = lazy(() => import("./components/auth/SignIn"));
const Register = lazy(() => import("./components/auth/Register"));
const AccountPage = lazy(() => import("./components/account/AccountPage"));
const EditName = lazy(() => import("./components/account/EditName"));
const EditEmail = lazy(() => import("./components/account/EditEmail"));
const EditPassword = lazy(() => import("./components/account/EditPassword"));
const Admin = lazy(() => import("./components/admin/Admin"));
const AdminSignIn = lazy(() => import("./components/admin/AdminSignIn"));
const AdminAuth = lazy(() => import("./components/protected/AdminAuth"));
const ManagementPage = lazy(
	() => import("./components/admin/management/ManagementPage")
);
const InventoryPage = lazy(
	() => import("./components/admin/inventory/InventoryPage")
);
const CreateProduct = lazy(
	() => import("./components/admin/inventory/CreateProduct")
);
const UpdateProduct = lazy(
	() => import("./components/admin/inventory/UpdateProduct")
);

const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			{/* Public routes */}
			<Route element={<PersistLogin />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="adminsignin" element={<AdminSignIn />} />
				<Route path="register" element={<Register />} />

				<Route path="products" element={<Outlet />}>
					<Route index element={<ProductPage />} />
					<Route path=":id" element={<ProductInfo />} />
				</Route>
				<Route path="cart" element={<Cart />} />

				{/* Private Routes */}
				<Route element={<RequireAuth />}>
					<Route path="checkout" element={<Outlet />}>
						<Route path="payment" element={<Payment />} />
						<Route path="shipping" element={<Shipping />} />
						<Route path="confirmation" element={<ReviewOrder />} />
					</Route>

					<Route path="orders" element={<Outlet />}>
						<Route index element={<OrderPage />} />
						<Route path=":id" element={<OrderInfo />} />
					</Route>

					<Route path="account" element={<Outlet />}>
						<Route index element={<AccountPage />} />
						<Route path="name" element={<EditName />} />
						<Route path="email" element={<EditEmail />} />
						<Route path="password" element={<EditPassword />} />
					</Route>
				</Route>

				<Route
					element={
						<AdminAuth authRoles={[accessRoles.Admin, accessRoles.Manager]} />
					}
				>
					<Route path="admin" element={<Outlet />}>
						<Route index element={<Admin />} />
						<Route path="create" element={<CreateProduct />} />
						<Route path="inventory" element={<Outlet />}>
							<Route index element={<InventoryPage />} />
							<Route path=":id" element={<UpdateProduct />} />
						</Route>

						<Route path="manage" element={<ManagementPage />} />
					</Route>
				</Route>
			</Route>

			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default function App() {
	return <RouterProvider router={appRouter} />;
}
