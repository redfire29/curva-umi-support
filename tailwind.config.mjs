/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {},
            fontFamily: {},
            colors: {
                'deep-sea': '#002B49',
                'curacao': '#0077B6',
                'mint-green': '#98E2C6',
                'pearl-white': '#F8F9FA',
                'coral-sun': '#F3D99A',
            },
            keyframes: {
                'move-forever': {
                    '0%': {
                        'transform': 'translate3d(-90px, 0, 0)'
                    },
                    '100%': {
                        'transform': 'translate3d(85px, 0, 0)'
                    }
                },
            },
        },
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant("js", ".js &");
            addVariant("nojs", ".no-js &");
        }),
    ],
}
