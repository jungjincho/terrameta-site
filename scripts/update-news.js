const fs = require("fs");

const API_KEY = process.env.NEWS_API_KEY;

async function fetchNews() {
  if (!API_KEY) {
    throw new Error("Missing NEWS_API_KEY.");
  }

  const url =
    "https://newsapi.org/v2/everything?" +
    "q=artificial%20intelligence%20OR%20AI%20technology&" +
    "language=en&" +
    "sortBy=publishedAt&" +
    "pageSize=12&" +
    "domains=techcrunch.com,theverge.com,wired.com,arstechnica.com,engadget.com,venturebeat.com,zdnet.com&" +
    `apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`NewsAPI request failed: ${res.status} ${JSON.stringify(data)}`);
  }

  const articles = (data.articles || []).filter((a) => {
    const title = (a.title || "").toLowerCase();
    const source = (a.source?.name || "").toLowerCase();

    return (
      a.title &&
      a.url &&
      !title.includes("pypi") &&
      !title.includes("npm") &&
      !title.includes("package") &&
      !source.includes("pypi")
    );
  });

  const news = articles.map((a) => ({
    title: a.title,
    url: a.url,
    publishedAt: a.publishedAt || new Date().toISOString(),
    source: a.source?.name || "Tech News",
    image: a.urlToImage || "images/news-default.jpg",
    summary: a.description || ""
  }));

  fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
  console.log(`Updated news.json with ${news.length} articles.`);
}

fetchNews();
