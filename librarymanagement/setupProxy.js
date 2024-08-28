const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/frappe',  // any requests starting with /api/frappe will be proxied
    createProxyMiddleware({
      target: 'https://frappe.io',  // target server
      changeOrigin: true,
      pathRewrite: {
        '^/api/frappe': '/api/method',  // remove /api/frappe prefix
      },
    })
  );
};
