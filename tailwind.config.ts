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
        sans: ["var(--font-sans)"],
        lato: ["var(--font-lato)"],
        coco: ["var(--font-cocosharp)"],
        gotham: ["var(--font-lato)"],
      },
      colors: {
        ctaStart: "#14A800",
        ctaEnd: "#0B7D43",
        primaryStart: "#126b91",
        primaryEnd: "#082F47",
        primaryHoverStart: "#468CA9",
        primaryHoverEnd: "#126b91",
        bgStart: "#126b91",
        bgEnd: "#082F47",
        accentStart: "#FFA726",
        accentEnd: "#FF7043",
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
  plugins: [require("@tailwindcss/typography")],
};
export default config;
