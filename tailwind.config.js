/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path according to your project structure
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Custom extra small breakpoint
        sm: "640px", // Modifying default sm
        md: "768px", // Modifying default md
        lg: "1024px", // Modifying default lg
        xl: "1530px", // Modifying default xl
      },
      backdropFilter: {
        none: "none",
        blur: "blur(10px)",
      },
      // Add custom animations
      animation: {
        shine: "shine var(--duration) linear infinite",
      },
      // Define keyframes for the shine animation
      keyframes: {
        shine: {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "100% 50%" },
        },
      },
      // Extend background sizes if needed
      backgroundSize: {
        "shine-size": "200% 200%",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};
