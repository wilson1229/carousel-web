const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.01:6055/", // 被替换的目标地址，即把 /api 替换成这个
      changeOrigin: true,
      pathRewrite: (path) => path.replace(/^\/api/, ""),
    })
  );
};


