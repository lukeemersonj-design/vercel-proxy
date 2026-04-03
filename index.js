const fetch = require("node-fetch");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

module.exports = async (req, res) => {
  // Root route example
  if (req.url === "/") {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } 
  // Proxy route example
  else if (req.url.startsWith("/proxy/")) {
    const target = req.url.replace("/proxy/", "");
    proxy.web(req, res, { target: `https://${target}`, changeOrigin: true });
  } 
  // 404 for anything else
  else {
    res.status(404).send("Not Found");
  }
};
