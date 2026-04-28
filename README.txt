TerraMeta AI + Tech Auto News Setup

This package connects your News page to GNews API and updates news.json automatically with AI + Tech news.

Files to upload to GitHub:
- news.html
- news.json
- package.json
- scripts/update-news.js
- .github/workflows/update-news.yml
- images/news-default.jpg

Important:
Do not upload .github as a text file. It must be a folder:
.github/workflows/update-news.yml

Step 1: Get a GNews API key
Go to gnews.io and create an API key.

Step 2: Add the API key to GitHub
Repository > Settings > Secrets and variables > Actions > New repository secret

Name:
GNEWS_API_KEY

Value:
your GNews API key

Step 3: Upload these files
Upload all folders and files to the root of your repository, same level as index.html.

Step 4: Run once manually
Repository > Actions > Update AI Tech News > Run workflow

Step 5: Check the site
https://jungjincho.github.io/terrameta-site/news.html

How it works:
- GitHub Actions runs once per day.
- It calls GNews API with AI + Tech keywords.
- It writes the newest articles into news.json.
- news.html reads news.json and displays article title, summary, source, link, and representative image.

Notes:
- The page links to the original article instead of copying the full article.
- If an article has no image, images/news-default.jpg is used.
- Free GNews plans may have limits or delays.
