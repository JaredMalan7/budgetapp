import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react"

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',


            },

            backgroundColor: {
                'meteorite': '#292d32',
                'app-base': '#f6f6f6',
                'progress': '#ee341b',
                'midDark': '#7e7f80',
                'royalBlue': '#0073ff',
                'mint': '#d7efde',
                'pale': '#fff0d9',
            },

            colors: {
                'dark-text': '#969696',
                'light-text': '#d7d7d7',
                'midDark-text': '#7e7f80',
                'pistachio': '#3ae26d',
                'mandarin': '#ff920b',
                'sun': '#ee341b',
                'royalBlue': '#0073ff',
                'mint': '#d7efde',
                'pale': '#fff0d9',

            },
            margin: {
                'centered': '0 auto',
            },
            width: {
                'card-w': '360px',

            },
            height: {
                'card-h': '200px'
            },
            fontSize: {
                'title1': '25px'
            }
        },
    },
    darkMode: "class",
    plugins: [nextui()],
}
export default config
