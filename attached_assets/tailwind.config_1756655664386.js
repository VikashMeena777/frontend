/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Playfair Display"', "serif"],
                sans: ["Montserrat", "ui-sans-serif", "system-ui"]
            },
            colors: {
                brand: {
                    50: "#eef6ff",
                    100: "#d9eaff",
                    200: "#b6d6ff",
                    300: "#86b8ff",
                    400: "#5b97ff",
                    500: "#3777ff",
                    600: "#285fe6",
                    700: "#204cc0",
                    800: "#1e419b",
                    900: "#1d3a7f"
                },
                ink: "#0b1020",
                soft: "#f5f7fb",
                accent: "#00D2D3"
            },
            boxShadow: {
                soft: "0 10px 30px rgba(16,24,40,0.08)"
            }
        }
    },
    plugins: []
};
