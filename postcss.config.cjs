module.exports = (ctx) => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(ctx.env === "production"
      ? {
          cssnano: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
});