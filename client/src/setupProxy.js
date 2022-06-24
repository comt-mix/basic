const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api/', {
          target: 'http://localhost:8000/',
          changeOrigin: true,
          // WDS_SOCKET_PORT=0
      })
  )
};