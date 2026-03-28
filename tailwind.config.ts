import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "#0f1a2e", 
        "on-tertiary": "#ffffff",
        "surface-variant": "#e8e3ce",
        "inverse-on-surface": "#f6f1dc",
        "surface-container": "#f3eed9",
        "on-primary-fixed": "#281800",
        "on-error-container": "#93000a",
        "error": "#ba1a1a",
        "outline": "#75777d",
        "outline-variant": "#c5c6cd",
        "on-secondary-container": "#4c6951",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "surface": "#fffae4",
        "tertiary-container": "#390c00",
        "surface-container-low": "#f9f4df",
        "primary-fixed": "#ffddaf",
        "surface-container-high": "#ede8d3",
        "on-surface-variant": "#45474d",
        "surface-container-lowest": "#ffffff",
        "on-background": "#1d1c0f",
        "background": "#fffae4",
        "primary": "#0f1a2e", 
        "tertiary-fixed": "#ffdbcf",
        "surface-bright": "#fffae4",
        "on-primary-fixed-variant": "#614000",
        "secondary": "#48654c",
        "surface-container-highest": "#e8e3ce",
        "inverse-surface": "#323123",
        "on-tertiary-container": "#c96947",
        "tertiary-fixed-dim": "#ffb59c",
        "on-tertiary-fixed-variant": "#7b2e11",
        "on-secondary-fixed": "#05210d",
        "on-secondary-fixed-variant": "#314d36",
        "secondary-container": "#c7e8c9",
        "primary-fixed-dim": "#ffba41",
        "tertiary": "#000000",
        "on-error": "#ffffff",
        "surface-tint": "#d4930a", 
        "inverse-primary": "#ffba41",
        "on-surface": "#1d1c0f",
        "secondary-fixed-dim": "#afcfb1",
        "on-primary-container": "#b07900",
        "surface-dim": "#dfdac6",
        "secondary-fixed": "#caebcc",
        "on-tertiary-fixed": "#390c00",
        "on-primary": "#ffffff",
        
        "navy": "#0f1a2e",
        "paper": "#f2edd8",
        "amber": "#d4930a",
        "sage": "#4e6b52"
      },
      fontFamily: {
        "headline": ["var(--font-lora)", "serif"],
        "body": ["var(--font-work-sans)", "sans-serif"],
        "label": ["var(--font-plex-mono)", "monospace"],
        "mono": ["var(--font-plex-mono)", "monospace"],
        "serif": ["var(--font-lora)", "serif"]
      },
      borderWidth: {
        "1.5": "1.5px"
      },
      borderRadius: {
        "DEFAULT": "0px", 
        "lg": "0px", 
        "xl": "0px", 
        "full": "9999px"
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
export default config;
