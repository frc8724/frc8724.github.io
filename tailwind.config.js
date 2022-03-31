module.exports = {
  content: [
    "./source/**/*.{html,md}",
    "./source/assets/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Raleway", "sans-serif"],
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};
