const fs = require("fs");

const API_KEY = process.env.NEWS_API_KEY;

async function fetchNews() {
  const url = `https://newsapi.org/v2/everything?q=AI&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.articles) {
    throw new Error("Failed to fetch news");
  }

  return data.articles.map(a => ({
    title: a.title,
    url: a.url,
    publishedAt: a.publishedAt,
    source: a.source?.name || "News"
  }));
}

(async () => {
  const news = await fetchNews();
  fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
})();
