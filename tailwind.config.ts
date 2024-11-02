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
        "three-colors-stripped":
          "linear-gradient(90deg, #a3bac3 33.33%, #f6a200 33.33%, #f6a200 66.67%, #002b38 66.67%, #002b38 100%)",
        "primary-secondary-stripped":
          "linear-gradient(90deg, #f6a200 50%, #002b38 50%, #002b38 100%)",
        "primary-grey-stripped":
          "linear-gradient(90deg, #a3bac3 50%, #002b38 50%, #002b38 100%)",
        "secondary-grey-stripped":
          "linear-gradient(90deg, #a3bac3 50%, #f6a200 50%, #f6a200 100%)",
      },
      colors: {
        // primary: "#002B38",
        primary: "#000000",
        // secondary: "#F6A200",
        secondary: "#D0DCE1",
        accent: "#F6A200",
        mapGrey: "#A3BAC3",
        mapLightGrey: "#D0DCE1",
        white: "#FFFFFF",
        mapRed: "#4a0309",
      },
      boxShadow: {
        blueShadow: "0px 0px 4px 2px rgba(0, 63, 82, 0.5)",
        buttonHoverShadow: "0px 0px 4px 2px rgba(246, 162, 0, 0.5)",
        listHoverShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.5)",
      },
      screens: {
        xxs: "350px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        ml: "860px",
        lg: "1024px",
        xl: "1280px",
        maxXXS: { max: "350px" },
        maxXS: { max: "480px" },
        maxSM: { max: "640px" },
        maxMD: { max: "768px" },
        maxML: { max: "860px" },
        maxLG: { max: "1024px" },
      },
    },
  },
  plugins: [],
};
export default config;
