import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://lol--lukeemersonj.replit.app" + req.url;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : null,
    });

    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
}
