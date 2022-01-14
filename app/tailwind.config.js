module.exports = {
  // mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  },
  content: [],
  theme: {
    extend: {
      colors: {
        DarkGrayishBlue: "hsl(227, 12%, 61%)",
        VeryDarkBlue: "hsl(233, 12%, 13%)",
        VeryPaleRed: "hsl(13, 100%, 96%)",
        VaryLightGray: "hsl(0, 0%, 98%)",
        BrightRed: "hsl(12, 88%, 59%)",
        DarkBlue: "hsl(228, 39%, 23%)",
        white: "hsl(0, 0%, 100%)",
        gray: "hsl(0, 0%, 96%)",
      },
    },
  },
  plugins: [],
};
