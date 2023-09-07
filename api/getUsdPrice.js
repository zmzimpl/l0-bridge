import ky from "ky-universal";

const cache = {};
export const getUsdPrice = async (...tickers) => {
  const nonCachedTickers = tickers.filter(
    (ticker) => cache[ticker] === undefined
  );
  console.log("nonCachedTickers", nonCachedTickers);
  let data = {};
  const url = `https://api.coinbase.com/v2/exchange-rates?currency=${nonCachedTickers.join(
    ","
  )}`;
  if (nonCachedTickers.length > 0) {
    data = await (
      await ky.get(url, {
        timeout: 30000,
      })
    ).json();
  }

  return tickers.map((ticker) => {
    if (cache[ticker]) {
      return cache[ticker];
    }

    const usd = data?.data?.rates?.USD;
    cache[ticker] = +usd;
    return +usd;
  });
};
