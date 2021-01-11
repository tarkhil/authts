module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        ignored: ["/node_modules/", "/public/", "**/.#*"]
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    public: process.env.DEV_PUBLIC ?? "kangami.over.ru",
    port: process.env.DEV_PORT ?? 8080
  }
};
