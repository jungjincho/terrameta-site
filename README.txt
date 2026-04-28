TerraMeta News Auto Update Guide

Upload these files to GitHub:
1. news.html
2. news.json
3. images/news-01.jpg
4. images/news-02.jpg
5. images/news-03.jpg
6. images/news-default.jpg

How to add a new news item:
Open news.json and add a new item at the top or bottom.

Example:

{
  "date": "2026-05-01",
  "title": "New TerraMeta Announcement",
  "summary": "Short English summary goes here.",
  "image": "images/news-04.jpg",
  "link": "#"
}

Then upload the matching image file:
images/news-04.jpg

The page automatically:
- loads items from news.json
- sorts news by newest date first
- shows each representative image
- updates whenever news.json is changed in GitHub
