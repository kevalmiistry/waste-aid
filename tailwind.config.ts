import { type Config } from "tailwindcss"

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "rgb(150, 217, 5)",
                "primary-100": "rgba(150, 217, 5, 0.1)",
            },
        },
    },
    plugins: [],
} satisfies Config
