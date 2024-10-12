import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cardo: ["var(--font-gotham)"],
        coco: ["var(--font-cocosharp)"],
        gotham: ["var(--font-gotham)"],
      },
      colors: {
        cta: "#14A800",
        primary: "#126b91",
        primaryHover: "#468CA9",
      },
      backgroundImage: {
        "woman-pc": "url('/assets/woman-pc.webp')",
        "lion-bg": "url('/assets/quixy/bg.webp')",
        "guitar-man": "url('/assets/guitar-man.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        login: "url('/assets/login.webp')",
        register: "url('/happy.webp')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};
export default config;
