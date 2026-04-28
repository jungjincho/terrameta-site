const fs = require("fs");

const API_KEY = process.env.GNEWS_API_KEY;
const OUTPUT_FILE = "news.json";

const QUERIES = [
  "AI technology",
  "artificial intelligence startup",
  "technology innovation"
];

function normalizeArticle(article) {
  return {
    date: article.publishedAt || new Date().toISOString(),
    title: article.title || "Untitled",
    summary: article.description || article.content || "",
    image: article.image || "images/news-default.jpg",
    link: article.url || "#",
    source: article.source && article.source.name ? article.source.name : "News"
  };
}

function dedupeByLink(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item.link || seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
  });
}

async function fetchGNews(query) {
  const params = new URLSearchParams({
    q: query,
    lang: "en",
    country: "us",
    max: "10",
    sortby: "publishedAt",
    apikey: API_KEY
  });

  const url = `https://gnews.io/api/v4/search?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GNews request failed: ${response.status} ${body}`);
  }

  const data = await response.json();
  return Array.isArray(data.articles) ? data.articles : [];
}

async function main() {
  if (!API_KEY) {
    throw new Error("Missing GNEWS_API_KEY. Add it in GitHub Settings > Secrets and variables > Actions.");
  }

  const allArticles = [];

  for (const query of QUERIES) {
    const articles = await fetchGNews(query);
    allArticles.push(...articles.map(normalizeArticle));
  }

  const filtered = dedupeByLink(allArticles)
    .filter((item) => item.title && item.link && item.summary)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 12);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(filtered, null, 2) + "\n", "utf8");
  console.log(`Updated ${OUTPUT_FILE} with ${filtered.length} AI + Tech articles.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
