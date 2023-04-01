/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      adopdark: "#171717",
      adopsoftdark: "#262626",
      midnight: "#121063",
      adoplight: "#f1f5f9",
      adoplighticon: "#b7b7b7",
      adoppix: "#4F9FDA",
      gray: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
    },
    extend: {
      dropShadow: {
        'center': '0px 0px 6px rgba(0, 0, 0, 0.25)',
      },
      boxShadow: {
        'section-center': '0px 0px 23px -6px rgba(47, 47, 47, 0.25)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}