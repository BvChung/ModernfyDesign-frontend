import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGetInventoryItem } from "../../../hooks/admin/inventory/useGetInventoryItem";
import { useUpdateProduct } from "../../../hooks/admin/inventory/useUpdateProduct";
import { useDeleteProduct } from "../../../hooks/admin/inventory/useDeleteProduct";
import { ProductForm } from "../../../interfaces/productInterface";
import Spinner from "../../loading/Spinner";
import { useAuthContext } from "../../../hooks/context/useAuthContext";

export default function ManageProduct() {
	const params = useParams();
	const { user } = useAuthContext();
	const {
		isSuccess,
		isLoading,
		data: productInfo,
	} = useGetInventoryItem(params.id!);

	const { mutate: updateProduct } = useUpdateProduct(params.id);
	const { mutate: deleteProduct } = useDeleteProduct(params.id!);
	const imageRef = useRef<HTMLInputElement>(null);

	const [productFormData, setProductFormData] = useState<ProductForm>({
		name: "",
		description: "",
		color: "",
		price: "",
		category: "",
	});
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string | null>(null);

	useEffect(() => {
		if (!productInfo) return;

		if (isSuccess) {
			setProductFormData({
				name: productInfo.name,
				description: productInfo.description,
				color: productInfo.color,
				price: productInfo.price.toFixed(2),
				category: productInfo.category,
			});
		}
	}, [isSuccess, productInfo]);

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

		if (file) {
			updateProduct({
				...productFormData,
				price: +productFormData.price,
				image,
				fileName: file.name,
			});
		} else {
			updateProduct({
				...productFormData,
				price: +parseFloat(productFormData.price).toFixed(2),
			});
		}

		if (imageRef.current) {
			imageRef.current.value = "";
		}
		if (file || image) {
			setFile(null);
			setImage(null);
		}
	}

	return (
		<>
			{!isLoading ? (
				<div className="flex flex-col items-center justify-center mb-6 mx-4 sm:mx-6 lg:mx-0">
					<div className="flex items-center justify-between w-full mt-8 mb-6 pb-2 border-b-[1px] border-gray-200 lg:max-w-5xl xl:max-w-6xl">
						<div className="flex items-center gap-2">
							<Link
								to={"/admin/inventory"}
								className="mr-2 cursor-pointer"
								aria-label="Return to inventory page"
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
							<span className="font-medium text-xl sm:text-2xl">
								Update Product
							</span>
						</div>

						<div
							className="tooltip tooltip-left md:tooltip-bottom"
							data-tip="Delete product"
						>
							<button
								onClick={() => {
									deleteProduct();
								}}
								className="btn btn-ghost btn-circle"
								aria-label="Delete product"
							>
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
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</div>
					</div>

					<div className="flex items-center gap-2 w-full mb-2 lg:max-w-5xl xl:max-w-6xl">
						<span className="font-medium text-sm md:text-base mb-1">
							Item #{productInfo?._id}
						</span>
					</div>

					<div className="flex items-center h-max w-full mb-4 lg:max-w-5xl xl:max-w-6xl ">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col justify-center gap-5 w-full md:w-fit"
						>
							<div className="form-control w-full">
								<label className="label">
									<span className="label-text ">Name</span>
								</label>
								<input
									type="text"
									placeholder="Name"
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
									placeholder="Price"
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
									placeholder="Color"
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
									placeholder="Description"
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
										<img
											src={image ? image : productInfo?.image}
											alt="Product"
											className="rounded-t-md w-full h-72 object-cover border-[1px] border-gray-300"
										/>
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
									accept=".png,.jpeg,.jpg"
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
									className="btn btn-primary h-11 w-fit rounded-md px-6"
									aria-label="Save updated product"
								>
									Save Changes
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<Spinner minHeight="min-h-screen" />
			)}
		</>
	);
}
