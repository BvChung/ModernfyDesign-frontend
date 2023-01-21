import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateProduct } from "../../../hooks/admin/inventory/useCreateProduct";
import { ProductForm } from "../../../types/productTypes";
import { useAuthContext } from "../../../hooks/context/useAuthContext";

export default function CreateProduct() {
	const { mutate, isSuccess } = useCreateProduct();
	const imageRef = useRef<HTMLInputElement>(null);
	const { user } = useAuthContext();

	const [productFormData, setProductFormData] = useState<ProductForm>({
		name: "",
		description: "",
		color: "",
		price: "",
		category: "",
	});

	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string | null>(null);

	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>
	): void {
		const { name, value } = e.target;

		setProductFormData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function readFile(file: File) {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setImage(reader.result?.toString()!);
		};
	}

	function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		// file size measured in bytes:
		// max size of 1 MB for guest account
		// 5 MB for admin
		const fileSizeLimit =
			user.email === process.env.REACT_APP_GUEST_ADMIN_EMAIL
				? 1 * 10 ** 6
				: 5 * 10 ** 6;

		const errDisplay =
			user.email === process.env.REACT_APP_GUEST_ADMIN_EMAIL ? "1" : "5";

		if (e.target.files[0].size <= fileSizeLimit) {
			const productImageFile = e.target.files[0];
			setFile(productImageFile);
			readFile(productImageFile);
		} else {
			if (imageRef.current) {
				imageRef.current.value = "";
			}

			return toast.error(`File must be less than ${errDisplay} MB`);
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!file) return toast.error("Missing image file.");

		mutate({
			...productFormData,
			price: +parseFloat(productFormData.price).toFixed(2),
			image,
			fileName: file.name,
		});
	}

	useEffect(() => {
		if (isSuccess) {
			if (imageRef.current) {
				imageRef.current.value = "";
			}

			setProductFormData({
				name: "",
				description: "",
				color: "",
				price: "",
				category: "",
			});
			setImage(null);
			setFile(null);
		}
	}, [isSuccess]);

	return (
		<div className="flex flex-col items-center justify-center mb-6 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 pb-2 border-b-[1px] border-gray-200 lg:max-w-5xl xl:max-w-6xl">
				<Link
					to={"/admin"}
					className="mr-2 cursor-pointer"
					aria-label="Return to admin page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<span className="font-medium text-xl sm:text-2xl">Create Product</span>
			</div>

			<div className="flex flex-col-reverse md:flex-row justify-between h-max w-full gap-4 lg:max-w-5xl xl:max-w-6xl">
				<div className="flex items-center h-max w-full mb-4 lg:max-w-5xl xl:max-w-6xl">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col justify-center gap-5 w-full md:w-fit"
					>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full md:w-[688px] bg-slate-50 rounded-md"
								name="name"
								value={productFormData.name}
								onChange={handleChange}
								required
								aria-label="Product name input"
							/>
						</div>

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Category</span>
							</label>
							<select
								name="category"
								value={productFormData.category}
								onChange={handleChange}
								className="select select-bordered w-full md:w-[688px] bg-slate-50 rounded-md"
								required
								aria-label="Product category select"
							>
								<option disabled value="">
									Assign category
								</option>
								<option value="Sofa">Sofa</option>
								<option value="Table">Table</option>
								<option value="Chair">Chair</option>
								<option value="Desk">Desk</option>
								<option value="Drawer">Drawer</option>
								<option value="Shelf">Shelf</option>
							</select>
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Price</span>
							</label>
							<input
								type="number"
								className="input input-bordered w-full md:w-[688px] bg-slate-50 rounded-md"
								name="price"
								value={productFormData.price}
								onChange={handleChange}
								required
								aria-label="Product price input"
							/>
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Color</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full md:w-[688px] bg-slate-50 rounded-md"
								name="color"
								value={productFormData.color}
								onChange={handleChange}
								required
								aria-label="Product color input"
							/>
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Description</span>
							</label>
							<textarea
								className="textarea textarea-bordered overflow-auto resize w-full md:w-[688px] h-36 bg-slate-50 rounded-md"
								name="description"
								value={productFormData.description}
								onChange={handleChange}
								required
							></textarea>
						</div>

						<div className="form-control w-full max-w-[26rem] mb-4">
							<span className="label label-text">Upload Image</span>
							<label htmlFor="image" className="cursor-pointer">
								<div className="relative">
									{image ? (
										<img
											src={image}
											alt="Product"
											className="rounded-t-md w-full h-72 object-cover"
										/>
									) : (
										<div className="flex items-center justify-center w-full h-72 rounded-t-md border-2 border-dashed border-gray-400 hover:border-primary-focus hover:border-solid hover:text-primary-focus group transition-colors">
											<div className="flex flex-col items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6 mb-1"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 4.5v15m7.5-7.5h-15"
													/>
												</svg>
												<p className="font-semibold text-lg group-hover:text-primary-focus">
													Upload image
												</p>
											</div>
										</div>
									)}

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-12 h-12 bg-offwhite rounded-full border-[1px] border-gray-900 p-2 absolute right-2 bottom-2 stroke-gray-900"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
										/>
									</svg>
								</div>
							</label>

							<input
								className="file-input hidden"
								ref={imageRef}
								type="file"
								id="image"
								name="image"
								accept=".png,.jpeg,.jpg,.avif,.webp"
								onChange={handleFile}
								aria-label="Product image upload"
							/>

							<div className="flex items-center gap-3 bg-gray-50 p-3 rounded-t-none rounded-b-md shadow-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="stroke-sky-600 flex-shrink-0 w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<div className="flex flex-col text-sm justify-center">
									<span className="text-sm">
										File format: JPEG, PNG, AVIF, WEBP
									</span>

									<span>
										(Recommended 1200x480, max{" "}
										{user.email === process.env.REACT_APP_GUEST_ADMIN_EMAIL
											? "1"
											: "5"}{" "}
										MB)
									</span>
								</div>
							</div>
						</div>

						<div className="flex justify-end max-w-2xl">
							<button
								className="btn btn-primary rounded-md w-fit px-6"
								aria-label="Create product"
							>
								Create product
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
