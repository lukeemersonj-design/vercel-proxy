const httpProxy = require('http-proxy');
const { createServer } = require('http');

const proxy = httpProxy.createProxyServer({});

const target = 'https://lol--lukeemersonj.replit.app';

createServer((req, res) => {
  proxy.web(req, res, { target, changeOrigin: true }, err => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error');
  });
}).listen(3000);

console.log(`Proxy running to ${target}`);
