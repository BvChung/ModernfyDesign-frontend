import axios from "axios";

export const eCommerceApiPublic = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

export const eCommerceApiPrivate = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
