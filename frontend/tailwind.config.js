/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "app-background":
          "linear-gradient(to bottom, var(--color-start), var(--color-middle), var(--color-90percent), var(--color-end))",
      }),
      screens: {
        sm500: "500px",
      },
      colors: {
        "app-gradient-start": "#ffeef9",
        "app-gradient-middle": "#fff7fb",
        "app-gradient-90percent": "#fffbfd",
        "app-gradient-end": "#ffffff",
      },
      transitionProperty: {
        height: "height",
        width: "width",
        opacity: "opacity",
        scale: "scale",
      },
    },
  },
  plugins: [],
};
