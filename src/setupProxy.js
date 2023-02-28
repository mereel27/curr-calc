const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/p24api**',
    createProxyMiddleware({
      target: 'https://api.privatbank.ua',
      changeOrigin: true,
    })
  );
};
