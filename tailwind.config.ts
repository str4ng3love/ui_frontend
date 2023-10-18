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
      colors: {
        text: "var(--text)",
        text_inactive: "var(--textInactive)",
        primary: "var(--primaryColor)",
        secondary: "var(--secondaryColor)",
        baseColor: "var(--base)",
        link: "var(--link)"
      },
    },boxShadow:{
      'link':'0rem 0rem 1rem'
    }, 
    keyframes:{
      spin: {
        "from": {
          transform: "rotate(0deg)"
        },
        "to": {
          transform: "rotate(360deg)"
        }
      },
      fadeOut:{
        "0%": {
          opacity: "1"
        },
        "100%" :{
          opacity: "0"
        }
      }, 
      fadeIn: {
        "0%":{
          opacity: "0"
        },
        "100%":{
          opacity: "1"
        }
      },
      fadeInAndOut: {
        "0%, 100%":{
          opacity:"0"
        },
        "20%, 80%":{
          opacity: "1"
        }
      }
      
    },
    animation:{
      fadeInOut: "fadeInAndOut ease-in-out 3s forwards",
      spin: "spin 1s linear infinite"
    }
  },
  plugins: [],
};
export default config;
