import { type Config } from "tailwindcss"

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "rgb(150, 217, 5)",
                "primary-100": "rgba(150, 217, 5, 0.1)",
                "primary-200": "rgba(150, 217, 5, 0.2)",
                "primary-300": "rgba(150, 217, 5, 0.3)",
                "primary-400": "rgba(150, 217, 5, 0.4)",
                "primary-500": "rgba(150, 217, 5, 0.5)",
                "primary-600": "rgba(150, 217, 5, 0.6)",
                "primary-700": "rgba(150, 217, 5, 0.7)",
                "primary-800": "rgba(150, 217, 5, 0.8)",
                "primary-900": "rgba(150, 217, 5, 0.9)",
            },
        },
    },
    plugins: [],
} satisfies Config
