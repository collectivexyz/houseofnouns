import { Currency } from "types";

export const formatCurrencyNoDecimals = (num: number) => {
  let n = num;
  if (Number.isNaN(n)) n = 1;
  n = Math.trunc(n);
  return `$${new Intl.NumberFormat("en").format(n)}`;
};

export const formatCurrencyDifNoDecimals = (num: number) => {
  const cur = formatCurrencyNoDecimals(Math.abs(num));
  return num < 0 ? `-${cur}` : cur;
};

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
export const abbreviateNumber = (num: number) => {
  // eslint-disable-next-line no-bitwise
  const tier = (Math.log10(Math.abs(num)) / 3) | 0;
  if (tier === 0) return num;
  const suffix = SI_SYMBOL[tier];
  const scale = 10 ** (tier * 3);
  const scaled = num / scale;
  return scaled.toFixed(1) + suffix;
};

export const formatPercentile = (num: number) => {
  if (Number.isNaN(num)) {
    return null;
  }

  let n = num * 100;
  if (n === 0) n = 0;
  else if (n < 0.001) n = 0.001;
  else if (n < 0.01) n = 0.01;
  else if (n < 0.1) n = 0.1;
  else n = Math.round(n * 10) / 10;
  return new Intl.NumberFormat("en").format(n);
};

export const formatRoi = (num: number) => {
  if (!Number.isNaN(num)) return `0`;

  let n = num * 100;
  n = n > 10 ? Math.trunc(n) : Math.round(n * 10) / 10;
  return new Intl.NumberFormat("en").format(n);
};

export const formatPercentage = (num: number, numberOnly = false) => {
  let n = num * 100;

  if (Number.isNaN(n)) {
    n = 1;
  } else {
    n = n > 10 ? Math.trunc(n) : Math.round(n * 10) / 10;
  }

  if (numberOnly) return new Intl.NumberFormat("en").format(n);

  return `${new Intl.NumberFormat("en").format(n)}%`;
};

export const formatRank = (num: number) => `#${new Intl.NumberFormat("en").format(num)}`;

export const formatBigNum = (num: number) =>
  Number.isNaN(num) ? "0" : new Intl.NumberFormat("en").format(num);

const defaultTimeMapping = {
  years: "years",
  months: "months",
  day: "day",
  days: "days",
  hour: "hr",
  hours: "hrs",
  minutes: "min",
  seconds: "sec",
};

export const timeUntil = (rawDate: Date | string | number) => {
  const date = rawDate instanceof Date ? rawDate : new Date(rawDate);
  const now = new Date();

  // get total seconds between the times
  let delta = Math.abs(date.getTime() - now.getTime()) / 1000;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = delta % 60; // in theory the modulus is not required
  return { days, hours, minutes, seconds: Math.round(seconds) };
};

//timeUntilStringified
export const timeUntilStringified = (
  rawDate: Date | string | number,
  mapping = defaultTimeMapping,
  withSpacing = true
) => {
  const { days, hours, minutes, seconds } = timeUntil(rawDate);

  if (days > 0) {
    return `${days}${withSpacing ? " " : ""}${mapping.days}`;
  }

  if (hours > 0) {
    return `${hours}${withSpacing ? " " : ""}${mapping.hours}`;
  }

  if (minutes > 0) {
    return `${minutes}${withSpacing ? " " : ""}${mapping.minutes}`;
  }

  return `${seconds}${withSpacing ? " " : ""}${mapping.seconds}`;
};

export const timeSince = (
  rawDate: Date | string | number,
  mapping = defaultTimeMapping,
  withSpacing = true
) => {
  try {
    const date = rawDate instanceof Date ? rawDate : new Date(rawDate);

    const now = new Date();
    const dif = now.getTime() - date.getTime();
    const seconds = Math.floor(dif / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.years}`;
    }

    interval = seconds / 2592000;

    if (interval > 1) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.months}`;
    }

    interval = seconds / 86400;

    if (interval < 2 && interval > 1) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.day}`;
    }

    if (interval > 2) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.days}`;
    }

    interval = seconds / 3600;

    if (interval < 2 && interval > 1) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.hour}`;
    }

    if (interval > 1) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.hours}`;
    }

    interval = seconds / 60;

    if (interval > 1) {
      return `${Math.floor(interval)}${withSpacing ? " " : ""}${mapping.minutes}`;
    }

    return `${Math.floor(interval * 60)}${withSpacing ? " " : ""}${mapping.seconds}`;
  } catch (e) {
    console.error(e);
    return "";
  }
};

const NEGATIVE_SEC_REGEXP = /^-[0-9]s$/;

const timeUnitMapping = {
  years: "y",
  months: "mo",
  day: "d",
  days: "d",
  hour: "hr",
  hours: "hrs",
  minutes: "m",
  seconds: "s",
};

export function timeSinceShort(date: string | Date | number, justNowLabelThresholdSeconds = 0) {
  const time = timeSince(date, timeUnitMapping, false);

  if (time === "0s" || NEGATIVE_SEC_REGEXP.test(time)) {
    return "just now";
  }

  if (time === "30d") {
    return "1mo";
  }

  if (justNowLabelThresholdSeconds !== 0) {
    const timeCopy = time.slice();
    const timeUnit = timeCopy.replace(/\d/g, "");

    const isInSeconds = timeUnit === "s";
    if (isInSeconds) {
      const isBelowThreshold = parseInt(time, 10) < justNowLabelThresholdSeconds;
      if (isBelowThreshold) {
        return "just now";
      }
    }
  }

  return time;
}

export const commafy = (value: number) => {
  const num = (value || 0).toString().split(".")[0];
  const str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const formatCompact = (num: number, decimals = 2) =>
  Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: decimals <= 2 ? decimals : 2,
    maximumFractionDigits: 2,
  }).format(num);

export const ellipseLongString = (value: string, length: number) => {
  if (!value) {
    return "";
  }
  return value.length <= length ? value : `${value.slice(0, length)}...`;
};

export const getFractionDigits = (amount: number) => {
  if (amount < 0.1) return 3;
  if (amount > 1000) return 0;
  return 2;
};

export const formatPrice = (price: number, currency = Currency.ETH, compact = false): string => {
  if (Number.isNaN(price)) return "0";

  const maximumFractionDigits = getFractionDigits(Math.abs(price));

  const number = compact
    ? formatCompact(price, 2)
    : new Intl.NumberFormat("en", { maximumFractionDigits }).format(price);

  if (currency === "eth") return `${number} ETH`;
  if (currency === "usd") return `$${number}`;
  if (currency === "matic") return `${number} MATIC`;

  return number;
};

export const getOrdinalString = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
};
