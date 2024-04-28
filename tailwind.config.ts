import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#003F52",
      secondary: "#F6A200",
      mapGrey: "#A3BAC3",
      white: "#FFFFFF",
    },
    boxShadow: {
      blueShadow: "0px 0px 4px 2px rgba(0, 63, 82, 0.5)",
      buttonHoverShadow: "0px 0px 4px 2px rgba(246, 162, 0, 0.5)",
      listHoverShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.5)",
    },
    screens: {
      sm: "640px",
      md: "768px",
      ml: "860px",
      lg: "1024px",
      xl: "1280px",
      maxML: { max: "860px" },
      maxLG: { max: "1024px" },
    },
  },
  plugins: [],
};
export default config;
