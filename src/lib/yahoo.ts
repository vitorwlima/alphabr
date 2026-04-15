import YahooFinance from "yahoo-finance2";

const noop = () => {};

export const yahooFinance = new YahooFinance({
  logger: { info: noop, warn: noop, error: noop, debug: noop, dir: noop },
});
