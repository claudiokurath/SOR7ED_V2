/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'sor7ed-brand': '#f7c600', // Strong Mustard Yellow
                'sor7ed-brand-soft': '#fcdb5d', // Soft Yellow variant (lighter)
            },
            fontFamily: {
                sans: ['Roboto', 'system-ui', 'sans-serif'],
                display: ['"Antarctican Headline"', 'sans-serif'],
                mono: ['"Courier New"', 'monospace'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
                '6xl': '4rem',
            },
            fontSize: {
                '7xl': '5rem',
                '8xl': '6rem',
                '9xl': '8rem',
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
