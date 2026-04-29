const fs = require("fs");

const API_KEY = process.env.NEWS_API_KEY;

async function fetchNews() {
  if (!API_KEY) {
    throw new Error("Missing NEWS_API_KEY. Add it in GitHub Settings > Secrets and variables > Actions.");
  }

  const url = `https://newsapi.org/v2/everything?q=AI%20technology&language=en&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`NewsAPI request failed: ${res.status} ${JSON.stringify(data)}`);
  }

  if (!Array.isArray(data.articles)) {
    throw new Error("No articles found in NewsAPI response.");
  }

  const news = data.articles.map((a) => ({
    title: a.title || "Untitled",
    url: a.url || "#",
    publishedAt: a.publishedAt || new Date().toISOString(),
    source: a.source?.name || "News",
    image: a.urlToImage || "images/news-default.jpg",
    summary: a.description || ""
  }));

  return news;
}

async function main() {
  const news = await fetchNews();
  fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
  console.log(`Updated news.json with ${news.length} articles.`);
}

main();
