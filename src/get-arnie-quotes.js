const { httpGet } = require("./mock-http-interface");

const getSingleQuote = async (url) => {
  const response = await httpGet(url);
  const { message } = JSON.parse(response.body);

  if (response.status !== 200) {
    throw new Error(message);
  }

  return message;
};

const toResult = (fetchResult) =>
  fetchResult.status === "fulfilled"
    ? { "Arnie Quote": fetchResult.value }
    : { FAILURE: fetchResult.reason.message };

const getArnieQuotes = async (urls) => {
  const fetchResults = await Promise.allSettled(urls.map(getSingleQuote));
  const results = fetchResults.map(toResult);

  return results;
};

module.exports = {
  getArnieQuotes,
};
