export default async function handler(req, res) {
  const { query } = req.query;
  const ACCESS_TOKEN = "56b4c1ae9caa9c9e67de9320789a0c2c";
  if (!query) return res.status(400).json({ response: "error", error: "Missing query" });

  try {
    const apiUrl = `https://superheroapi.com/api/${ACCESS_TOKEN}/search/${encodeURIComponent(query)}`;
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ response: "error", error: "API fetch failed" });
  }
}