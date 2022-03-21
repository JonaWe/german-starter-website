const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                bebas: ['Bebas Neue']
            },
            colors: {
                rust: {
                    100: '#f5d9d5',
                    200: '#ebb3aa',
                    300: '#e18d80',
                    400: '#d76755',
                    500: '#cd412b',
                    600: '#a43422',
                    700: '#7b271a',
                    800: '#521a11',
                    900: '#290d09',
                },
                background: {
                    100: '#d1d1d1',
                    200: '#a4a4a4',
                    300: '#767676',
                    400: '#494949',
                    500: '#1b1b1b',
                    600: '#161616',
                    700: '#101010',
                    800: '#0b0b0b',
                    900: '#050505',
                },
                sand: {
                    100: '#fffefd',
                    200: '#fffdfb',
                    300: '#fffdfa',
                    400: '#fffcf8',
                    500: '#fffbf6',
                    600: '#ccc9c5',
                    700: '#999794',
                    800: '#666462',
                    900: '#333231',
                },
            },
        },
    },
    plugins: [],
};