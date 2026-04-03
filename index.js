import express from "express";
import fetch from "node-fetch";
import httpProxy from "http-proxy";

const app = express();
const proxy = httpProxy.createProxyServer({});

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.all("/proxy/*", (req, res) => {
  const target = req.url.replace("/proxy/", "");
  proxy.web(req, res, { target: `https://${target}`, changeOrigin: true });
});

export default app;
