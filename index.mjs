import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.url === "/") {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(r => r.json());
    res.status(200).json(data);
  } else {
    res.status(404).send("Not Found");
  }
}
