module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend:{
        colors: {
          // dark_navbar: "#0a192f",
          dark_navbar: "#262A33",
          white_navbar: "#2E323C",
          // dark_bg: "#243247",
          dark_bg: "#2E323C",
          white_bg: "#F3F4F6",
          border_primary: "#A4A9B5",
          // color_primary: "#64ffda",
          primary: {
            DEFAULT: "#E67082",
            100: "#BF5E6C",
            200: "#803E48",
            300: "#401F24",
            400: "#FF7D90"
          },
          primary_green: {
            DEFAULT: "#72E885",
            100: "#52A861",
            200: "#33693C",
            300: "#78F58D",
            400: "#65CF77"
          }
        },
      }
    },
    plugins: [],
};
