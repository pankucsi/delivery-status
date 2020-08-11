const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  rejectUnauthorized: false,
  target: 'https://maps.googleapis.com',
})

proxy.listen(8000)

proxy.on('proxyRes', function (proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
})
