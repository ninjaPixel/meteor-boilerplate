const approxFXRates = {
  gbp: 1,
  usd: 0.77,
  eur: 0.89,
};

const convert = (amount, currencyCode) => approxFXRates[currencyCode.toLowerCase()] * amount;

export default convert;
