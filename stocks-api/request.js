const axios = require("axios");

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

/**
 * SEARCH STOCKS
 */

const processSearchResults = results => {
  const resultsToProcess = results["bestMatches"];
  if (resultsToProcess) {
    // Customize the properties name and return only five results
    return resultsToProcess
      .map(searchResult => ({
        symbol: searchResult["1. symbol"],
        name: searchResult["2. name"],
        currency: searchResult["8. currency"]
      }))
      .slice(0, 5);
  }
};

const requestSearch = async (req, res) => {
  const { keywords } = req.params;
  try {
    const result = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`
    );
    const data = result.data;
    const searchResults = processSearchResults(data);
    return res.json(searchResults);
  } catch (err) {
    return res.status(500).json("An unexpected error happened.");
  }
};

/**
 * ALL STOCKS
 */

const processChart = chart => {
  let series = [];
  chart.forEach(dataAtDatetime => {
    // Convert to timestamp for Highstocks
    let timestamp = Date.parse(dataAtDatetime.date);
    let closeNumber = dataAtDatetime.close;
    series.push([timestamp, closeNumber]);
  });
  return series;
};

const processQuote = quote => {
  const {
    symbol,
    companyName,
    open,
    close,
    high,
    low,
    change,
    changePercent,
    latestPrice,
    latestTime,
    latestVolume
  } = quote;
  return {
    symbol,
    companyName,
    open,
    close,
    high,
    low,
    change,
    changePercent,
    latestPrice,
    latestTime,
    latestVolume
  };
};

const processData = data => {
  const quote = processQuote(data.quote);
  const chart = processChart(data.chart);
  return { quote, chart };
};

const requestSymbol = async (req, res) => {
  const { symbol } = req.params;
  try {
    const responseStock = await axios.get(
      `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,chart&range=2y`
    );
    try {
      const stock = processData(responseStock.data);
      // Add logo to data
      const responseLogo = await axios.get(
        `https://api.iextrading.com/1.0/stock/${symbol}/logo`
      );
      const logo = responseLogo.data;
      stock.quote.logo = logo;
      return res.json(stock);
    } catch (err) {
      return res.status(500).json("Oops! Something bad happened.");
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data;
    return res.status(status).json(message);
  }
};

const processDetailChart = chart => {
  let series = [];
  chart.forEach(dataAtDatetime => {
    let timestamp = Date.parse(dataAtDatetime.date);
    series.push([
      timestamp,
      dataAtDatetime.open,
      dataAtDatetime.high,
      dataAtDatetime.low,
      dataAtDatetime.close
    ]);
  });
  return series;
};

/**
 * DETAIL STOCK
 */

const processNews = news =>
  news.map(element => ({
    datetime: element.datetime,
    headline: element.headline,
    url: element.url,
    image: element.image
  }));

const processDetailData = data => {
  const quote = processQuote(data.quote);
  const chart = processDetailChart(data.chart);
  const news = processNews(data.news);
  return { quote, chart, news };
};

const requestDetailSymbol = async (req, res) => {
  const { symbol } = req.params;
  try {
    const responseStock = await axios.get(
      `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=5y`
    );
    try {
      const stock = processDetailData(responseStock.data);
      const responseLogo = await axios.get(
        `https://api.iextrading.com/1.0/stock/${symbol}/logo`
      );
      const logo = responseLogo.data;
      stock.quote.logo = logo;
      return res.json(stock);
    } catch (err) {
      return res.status(500).json("Oops! Something bad happened.");
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data;
    return res.status(status).json(message);
  }
};

module.exports = {
  requestSearch,
  requestSymbol,
  requestDetailSymbol
};
