const { fetchWithKeyword, fetchTopHeadlines } = require('../services/newsFetchService');

const getNews = async (req, res) => {
  try {
    let news;

    if (Object.keys(req.query).length) {
      news = await fetchWithKeyword(req.query);
    } else {
      news = await fetchTopHeadlines();
    }

    news = JSON.parse(news);

    const data = news.articles.map((item) => {
      const { title: headline, url: link } = item;

      return { headline, link };
    });

    res.status(200).json({ count: news.totalResults, data: data });
  } catch (e) {
    res.status(500).json({ message: e.toString() });
  }
};

module.exports = { getNews };
