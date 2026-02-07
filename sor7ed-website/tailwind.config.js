export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'sor7ed-yellow': '#F5C614',
                'sor7ed-black': '#000000',
                'zinc-950': '#09090b',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['antarctican-headline', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['mono45-headline', 'Fira Code', 'monospace'],
            },
        },
    },
    plugins: [],
}
