/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

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
            },
            boxShadow: {
                primary: "0px 0px 30px rgba(246, 46, 70, 0.8)",
                blue: "0px 0px 20px rgba(36, 150, 255, 0.8)",
                yel: "0px 0px 20px rgba(255, 153, 0, 0.8)",
                green: "0px 0px 20px rgba(63, 201, 85, 0.8)",
                gry: "0px 0px 20px #5D6182",
            },
            animation: {
                load: "loading 2s linear infinite"
            },
            backgroundImage: {
                'gradient-open': 'linear-gradient(90deg, #2496FF -60%, rgba(92, 95, 126, 0) 100%);',
                'gradient-pending': 'linear-gradient(90deg, #FF9900 -60%, rgba(92, 95, 126, 0) 100%)',
                'gradient-closed': '#373A54',
                'gradient-completed': 'linear-gradient(90deg, #3FC955 -60%, rgba(92, 95, 126, 0) 100%)',
                'gradient-positive':'linear-gradient(90deg, #3FC955 0%, rgba(92, 95, 126, 0) 100%)',
                'gradient-negative':'linear-gradient(90deg, #F62E46 0%, rgba(92, 95, 126, 0) 100%)',
                'gradient-neutral':'linear-gradient(90deg, #6C7094 0%, rgba(92, 95, 126, 0) 100%)',
            },
            keyframes: {
                loading: {
                    "0%": {
                        backgroundImage: "url('../src/assets/img/loader0.png')"
                    },
                    "1%": {
                        backgroundImage: "url('../src/assets/img/loader1.png')"
                    },
                    "2%": {
                        backgroundImage: "url('../src/assets/img/loader2.png')"
                    },
                    "3%": {
                        backgroundImage: "url('../src/assets/img/loader3.png')"
                    },
                    "4%": {
                        backgroundImage: "url('../src/assets/img/loader4.png')"
                    },
                    "5%": {
                        backgroundImage: "url('../src/assets/img/loader5.png')"
                    },
                    "6%": {
                        backgroundImage: "url('../src/assets/img/loader6.png')"
                    },
                    "7%": {
                        backgroundImage: "url('../src/assets/img/loader7.png')"
                    },
                    "8%": {
                        backgroundImage: "url('../src/assets/img/loader8.png')"
                    },
                    "9%": {
                        backgroundImage: "url('../src/assets/img/loader9.png')"
                    },
                    "10%": {
                        backgroundImage: "url('../src/assets/img/loader10.png')"
                    },
                    "11%": {
                        backgroundImage: "url('../src/assets/img/loader11.png')"
                    },
                    "12%": {
                        backgroundImage: "url('../src/assets/img/loader12.png')"
                    },
                    "13%": {
                        backgroundImage: "url('../src/assets/img/loader13.png')"
                    },
                    "14%": {
                        backgroundImage: "url('../src/assets/img/loader14.png')"
                    },
                    "15%": {
                        backgroundImage: "url('../src/assets/img/loader15.png')"
                    },
                    "16%": {
                        backgroundImage: "url('../src/assets/img/loader16.png')"
                    },
                    "17%": {
                        backgroundImage: "url('../src/assets/img/loader17.png')"
                    },
                    "18%": {
                        backgroundImage: "url('../src/assets/img/loader18.png')"
                    },
                    "19%": {
                        backgroundImage: "url('../src/assets/img/loader19.png')"
                    },
                    "20%": {
                        backgroundImage: "url('../src/assets/img/loader20.png')"
                    },
                    "21%": {
                        backgroundImage: "url('../src/assets/img/loader21.png')"
                    },
                    "22%": {
                        backgroundImage: "url('../src/assets/img/loader22.png')"
                    },
                    "23%": {
                        backgroundImage: "url('../src/assets/img/loader23.png')"
                    },
                    "24%": {
                        backgroundImage: "url('../src/assets/img/loader24.png')"
                    },
                    "25%": {
                        backgroundImage: "url('../src/assets/img/loader25.png')"
                    },
                    "26%": {
                        backgroundImage: "url('../src/assets/img/loader26.png')"
                    },
                    "27%": {
                        backgroundImage: "url('../src/assets/img/loader27.png')"
                    },
                    "28%": {
                        backgroundImage: "url('../src/assets/img/loader28.png')"
                    },
                    "29%": {
                        backgroundImage: "url('../src/assets/img/loader29.png')"
                    },
                    "30%": {
                        backgroundImage: "url('../src/assets/img/loader30.png')"
                    },
                    "31%": {
                        backgroundImage: "url('../src/assets/img/loader31.png')"
                    },
                    "32%": {
                        backgroundImage: "url('../src/assets/img/loader32.png')"
                    },
                    "33%": {
                        backgroundImage: "url('../src/assets/img/loader33.png')"
                    },
                    "34%": {
                        backgroundImage: "url('../src/assets/img/loader34.png')"
                    },
                    "35%": {
                        backgroundImage: "url('../src/assets/img/loader35.png')"
                    },
                    "36%": {
                        backgroundImage: "url('../src/assets/img/loader36.png')"
                    },
                    "37%": {
                        backgroundImage: "url('../src/assets/img/loader37.png')"
                    },
                    "38%": {
                        backgroundImage: "url('../src/assets/img/loader38.png')"
                    },
                    "39%": {
                        backgroundImage: "url('../src/assets/img/loader39.png')"
                    },
                    "40%": {
                        backgroundImage: "url('../src/assets/img/loader40.png')"
                    },
                    "41%": {
                        backgroundImage: "url('../src/assets/img/loader41.png')"
                    },
                    "42%": {
                        backgroundImage: "url('../src/assets/img/loader42.png')"
                    },
                    "43%": {
                        backgroundImage: "url('../src/assets/img/loader43.png')"
                    },
                    "44%": {
                        backgroundImage: "url('../src/assets/img/loader44.png')"
                    },
                    "45%": {
                        backgroundImage: "url('../src/assets/img/loader45.png')"
                    },
                    "46%": {
                        backgroundImage: "url('../src/assets/img/loader46.png')"
                    },
                    "47%": {
                        backgroundImage: "url('../src/assets/img/loader47.png')"
                    },
                    "48%": {
                        backgroundImage: "url('../src/assets/img/loader48.png')"
                    },
                    "49%": {
                        backgroundImage: "url('../src/assets/img/loader49.png')"
                    },
                    "50%": {
                        backgroundImage: "url('../src/assets/img/loader50.png')"
                    },
                    "51%": {
                        backgroundImage: "url('../src/assets/img/loader51.png')"
                    },
                    "52%": {
                        backgroundImage: "url('../src/assets/img/loader52.png')"
                    },
                    "53%": {
                        backgroundImage: "url('../src/assets/img/loader53.png')"
                    },
                    "54%": {
                        backgroundImage: "url('../src/assets/img/loader54.png')"
                    },
                    "55%": {
                        backgroundImage: "url('../src/assets/img/loader55.png')"
                    },
                    "56%": {
                        backgroundImage: "url('../src/assets/img/loader56.png')"
                    },
                    "57%": {
                        backgroundImage: "url('../src/assets/img/loader57.png')"
                    },
                    "58%": {
                        backgroundImage: "url('../src/assets/img/loader58.png')"
                    },
                    "59%": {
                        backgroundImage: "url('../src/assets/img/loader59.png')"
                    },
                    "60%": {
                        backgroundImage: "url('../src/assets/img/loader60.png')"
                    },
                    "61%": {
                        backgroundImage: "url('../src/assets/img/loader61.png')"
                    },
                    "62%": {
                        backgroundImage: "url('../src/assets/img/loader62.png')"
                    },
                    "63%": {
                        backgroundImage: "url('../src/assets/img/loader63.png')"
                    },
                    "64%": {
                        backgroundImage: "url('../src/assets/img/loader64.png')"
                    },
                    "65%": {
                        backgroundImage: "url('../src/assets/img/loader65.png')"
                    },
                    "66%": {
                        backgroundImage: "url('../src/assets/img/loader66.png')"
                    },
                    "67%": {
                        backgroundImage: "url('../src/assets/img/loader67.png')"
                    },
                    "68%": {
                        backgroundImage: "url('../src/assets/img/loader68.png')"
                    },
                    "69%": {
                        backgroundImage: "url('../src/assets/img/loader69.png')"
                    },
                    "70%": {
                        backgroundImage: "url('../src/assets/img/loader70.png')"
                    },
                    "71%": {
                        backgroundImage: "url('../src/assets/img/loader71.png')"
                    },
                    "72%": {
                        backgroundImage: "url('../src/assets/img/loader72.png')"
                    },
                    "73%": {
                        backgroundImage: "url('../src/assets/img/loader73.png')"
                    },
                    "74%": {
                        backgroundImage: "url('../src/assets/img/loader74.png')"
                    },
                    "75%": {
                        backgroundImage: "url('../src/assets/img/loader75.png')"
                    },
                    "76%": {
                        backgroundImage: "url('../src/assets/img/loader76.png')"
                    },
                    "77%": {
                        backgroundImage: "url('../src/assets/img/loader77.png')"
                    },
                    "78%": {
                        backgroundImage: "url('../src/assets/img/loader78.png')"
                    },
                    "79%": {
                        backgroundImage: "url('../src/assets/img/loader79.png')"
                    },
                    "80%,100%": {
                        backgroundImage: "url('../src/assets/img/loader80.png')"
                    }
                }
            }
        }
    },
    variants: {
        backgroundColor: ["responsive", "hover", "focus", "active"]
    },
    plugins: [
        plugin(function({ addUtilities, addComponents, e, prefix, config }) {
            const newUtilities = {
                '.horizontal-tb': {
                    writingMode: 'horizontal-tb',
                },
                '.vertical-rl': {
                    writingMode: 'vertical-rl'
                },
                '.vertical-lr': {
                    writingMode: 'vertical-lr'
                }
            }
            addUtilities(newUtilities)
        })
    ]
};
