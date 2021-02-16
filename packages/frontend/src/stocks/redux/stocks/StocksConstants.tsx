import { Period } from "./Stocks.types";
import dayjs from "dayjs";

export const HISTORICAL_PERIOD_INFO = {
  "1d": { goBackDays: 0, freqPeriod: "min", periodLength: 1 },
  "5d": { goBackDays: 4, freqPeriod: "min", periodLength: 5 },
  "1m": { goBackDays: 29, freqPeriod: "hour", periodLength: 1 },
  "6m": { goBackDays: 179, freqPeriod: "hour", periodLength: 4 },
  "ytd": { goBackDays: () => getNumDays("ytd"), freqPeriod: "hour", periodLength: 2 },
  "1y": { goBackDays: 364, freqPeriod: "hour", periodLength: 5 },
  "5y": { goBackDays: 365 * 5, freqPeriod: "hour", periodLength: 5 }
};

const getNumDays = (period: Period): number => {
  let now = dayjs();
  return Math.max(now.diff(`${now.get("year")}-01-01`, 'day'), 1)
}
