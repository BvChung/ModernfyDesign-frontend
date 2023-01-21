/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				gray1: "#212529",
				gray2: "#424242",
				gray3: "#616161",
				gray4: "#D9D9D9",
				gray5: "#bdbdbd",
				gray6: "#ECECEC",
				gray7: "#EBEBEB",
				gray8: "#f5f5f5",
				offwhite: "#f9fafb",
				offwhite2: "#F5F5F5",
				offwhite3: "#f3f3f4",
				accent1: "#0062D2",
				accent2: "#006AE3",
				accent3: "#0070F3",
				accent4: "#097CFF",
				accent5: "#1C86FF",
				accent6: "#2F90FF",
				accent7: "#67AEFF",
				accent8: "#bbd9fc",
			},
		},
	},
	daisyui: {
		themes: ["lofi", "black", "winter", "night"],
		// themes: ["lofi", "black", "winter", "night"],
	},
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "black",
	},
	plugins: [require("daisyui")],
};
