export const CurrencyFormatter = (amount: number, currency = "Rp") => {
  let temp = "";
  if (amount) {
    temp = `${currency} ${amount
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+\b)/g, "$1.")}`;
  }
  return temp;
};
export const formatNumber = (num: number, precision = 2) => {
  const map = [
    { suffix: " Trillion", threshold: 1e12 },
    { suffix: " Billion", threshold: 1e9 },
    { suffix: " Million", threshold: 1e6 },
    { suffix: " Thousand", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
};
