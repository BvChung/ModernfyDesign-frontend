import { Cloudinary } from "@cloudinary/url-gen";

export const cldConfig = new Cloudinary({
	cloud: {
		cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
	},
});
