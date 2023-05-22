/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                primary: "Firs"
            },
            colors: {
                primary: "#FF1935",
                secondary: "#2F3342",
                third: "#E2E7EE"
            }
        }
    },
    plugins: []
};
