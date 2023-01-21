import React, { createContext, useEffect, useState } from "react";
import {
	CartStorageData,
	CartCheckoutInfo,
	CartItemPrice,
	CartItemQuantity,
} from "../types/cartTypes";

type CartContextTypes = {
	myCart: CartStorageData[];
	setMyCart: React.Dispatch<React.SetStateAction<CartStorageData[]>>;
	cartItemsInfo: CartCheckoutInfo;
	setCartItemsInfo: React.Dispatch<React.SetStateAction<CartCheckoutInfo>>;
	addCartItem(newItem: CartStorageData): void;
	incrementCartQuantity(_id: string): void;
	decrementCartQuantity(_id: string): void;
	findCartItem(_id: string | undefined): CartStorageData | undefined;
	removeCartItem(_id: string): void;
	updateCartQuantity(updatedItem: CartItemQuantity): void;
	updateCartPrice(updatedItem: CartItemPrice): void;
	clearMyCart(): void;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

const CartContext = createContext({} as CartContextTypes);

export const CartProvider = ({ children }: AuthProviderProps) => {
	const [myCart, setMyCart] = useState<CartStorageData[]>(
		JSON.parse(localStorage.getItem("cart")!) || []
	);

	const [cartItemsInfo, setCartItemsInfo] = useState<CartCheckoutInfo>({
		subTotal: 0,
		numItems: 0,
		tax: 0,
		grandTotal: 0,
	});

	function findCartItem(_id: string | undefined) {
		return myCart.find((item) => item._id === _id);
	}

	function addCartItem(newItem: CartStorageData) {
		const foundItem = myCart.find(
			(product: CartStorageData) => product._id === newItem._id
		);

		if (foundItem) {
			return setMyCart((prev) => {
				return prev.map((item) => {
					if (item._id === newItem._id) {
						return {
							...item,
							quantity: item.quantity + newItem.quantity,
						};
					} else {
						return { ...item };
					}
				});
			});
		} else {
			return setMyCart((prev) => [...prev, newItem]);
		}
	}

	function removeCartItem(_id: string) {
		return setMyCart((prev) => prev.filter((item) => item._id !== _id));
	}

	function updateCartQuantity(updatedItem: CartItemQuantity) {
		return setMyCart((prev) => {
			return prev.map((item) => {
				if (item._id === updatedItem._id) {
					return {
						...item,
						quantity: updatedItem.quantity,
					};
				} else {
					return { ...item };
				}
			});
		});
	}

	function updateCartPrice(updatedItem: CartItemPrice) {
		return setMyCart((prev) => {
			return prev.map((item) => {
				if (item._id === updatedItem._id) {
					return {
						...item,
						price: updatedItem.price,
					};
				} else {
					return { ...item };
				}
			});
		});
	}

	function incrementCartQuantity(_id: string) {
		return setMyCart((prev) => {
			return prev.map((item) => {
				if (item._id === _id) {
					return {
						...item,
						quantity: (item.quantity += 1),
					};
				} else {
					return { ...item };
				}
			});
		});
	}

	function decrementCartQuantity(_id: string) {
		const foundItem = myCart.find(
			(product: CartStorageData) => product._id === _id
		);

		if (foundItem?.quantity === 1) {
			return removeCartItem(_id);
		} else {
			return setMyCart((prev) => {
				return prev.map((item) => {
					if (item._id === _id) {
						return {
							...item,
							quantity: (item.quantity -= 1),
						};
					} else {
						return { ...item };
					}
				});
			});
		}
	}

	function clearMyCart() {
		setMyCart([]);
	}

	useEffect(() => {
		// Sort products by id
		setMyCart((prev) =>
			prev.sort((a, b) => {
				if (a._id < b._id) {
					return -1;
				}
				if (a._id > b._id) {
					return 1;
				}
				return 0;
			})
		);

		localStorage.setItem("cart", JSON.stringify(myCart));

		// Update subtotal, number of items, tax, grandTotal
		setCartItemsInfo(() => {
			const subTotal = parseFloat(
				myCart
					.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)
					.toFixed(2)
			);
			const tax = parseFloat((subTotal * 0.0625).toFixed(2));
			const grandTotal = parseFloat((subTotal + tax).toFixed(2));

			return {
				subTotal,
				numItems: myCart.reduce((prev, curr) => prev + curr.quantity, 0),
				tax,
				grandTotal,
			};
		});
	}, [myCart]);

	return (
		<CartContext.Provider
			value={{
				myCart,
				setMyCart,
				cartItemsInfo,
				setCartItemsInfo,
				addCartItem,
				incrementCartQuantity,
				decrementCartQuantity,
				findCartItem,
				removeCartItem,
				updateCartQuantity,
				updateCartPrice,
				clearMyCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
