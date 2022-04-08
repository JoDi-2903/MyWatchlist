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
          dark_welcome: "#000000",
          white_welcome: "#ffffff",
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
    plugins: [
      require("tailwindcss-animation-property")({
        animationDuration: ["500ms", "2s", "0.5s", "4s"],
        // `animation-duration-500ms`, `animation-duration-6s`, `animation-duration-0.5s`
      
        animationDelay: ["3s", "400ms", "800ms", "1200ms", "1600ms", "2000ms", "2400ms", "3200ms",],
        // `animation-delay-2000ms`, `animation-delay-3s`
      
        animationIterationCount: [6, 7],
        // `animation-iteration-6`, `animation-iteration-7`
      
        animationFillMode: ['xxx'],
        // `animation-fill-xxx`
      
        animationDirection: ['xxx'],
        // `animation-direction-xxx`
      
        animationTimingFunction: {
          "in-out-cubic": ".65,0,.35,1",
        },
        // `animation-timing-in-out-cubic`
      
        animationPlayState: ['xxx'],
        // `animation-direction-xxx`
      
        animationStepsStart: [6,8],
        // `animate-steps-start-6`,`animate-steps-start-8`
      
        animationStepsEnd: [],  // same as animationStepsStart
        animationStepsBoth: [], // ...
        animationStepsNone: [], // ...
      }),
    ],
};
