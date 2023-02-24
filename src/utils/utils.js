export const onlyDecimals = (value) =>
  /^(?!^[.,])(?!.*[.,]{2,})(?!0{2})\d*(?:[.,]\d{0,5})?$/.test(value);

export const validateNumber = (num, value) => {
  const min = Number(value) * 0.9;
  const max = Number(value) * 1.1;
  const number = Number(num);
  if ([min, max, num].some((el) => isNaN(el))) {
    console.log("Can't validate NaN");
    return;
  }
  return number >= fixValue(min) && number <= fixValue(max);
};

export const isValidInput = (e) => {
  let value = e.key;
  if (e.type === 'paste') {
    value = e.clipboardData.getData('text');
  }
  return !['e', 'E', '+', '-', '--'].includes(value);
};

export const currencyLabels = {
  USD: '$',
  EUR: '€',
  BTC: '฿',
  UAH: '₴',
};

export const fixValue = (value, precision = 2) => {
  let toFormat = value;
  if (typeof value === 'string') {
    toFormat = value.replace(',', '.');
  }
  return Number(Number(toFormat).toFixed(precision));
};

export const convertCurrency = (
  currencyForSale,
  currencyToBuy,
  forSaleValue,
  toBuyValue,
  currencyRates
) => {
  const saleCurr = currencyRates.find((el) => el.ccy === currencyForSale);
  const buyCurr = currencyRates.find((el) => el.ccy === currencyToBuy);
  const saleBase = saleCurr?.base_ccy;
  const buyBase = buyCurr?.base_ccy;
  let salePrice;
  let buyPrice;

  if (currencyForSale === buyBase || currencyForSale === 'UAH') {
    salePrice = 1;
  } else if (currencyForSale === 'BTC') {
    const usdSaleRate = Number(
      currencyRates.find((el) => el.ccy === 'USD').buy
    );
    salePrice = Number(saleCurr?.buy) * usdSaleRate;
  } else {
    salePrice = Number(saleCurr?.buy);
  }

  if (currencyToBuy === saleBase || currencyToBuy === 'UAH') {
    buyPrice = 1;
  } else if (currencyToBuy === 'BTC') {
    const usdSaleRate = Number(
      currencyRates.find((el) => el.ccy === 'USD').sale
    );
    buyPrice = Number(buyCurr?.sale) * usdSaleRate;
  } else {
    buyPrice = Number(buyCurr?.sale);
  }

  if (forSaleValue) {
    const value =
      typeof forSaleValue === 'string'
        ? Number(forSaleValue.replace(',', '.'))
        : forSaleValue;
    const newValue = (salePrice / buyPrice) * value;
    const precision = currencyToBuy === 'BTC' ? 10 : 3;
    return fixValue(newValue, precision, true);
  }

  if (toBuyValue) {
    const value =
      typeof toBuyValue === 'string'
        ? Number(toBuyValue.replace(',', '.'))
        : toBuyValue;
    const newValue = (buyPrice / salePrice) * value;
    const precision = currencyForSale === 'BTC' ? 10 : 3;
    return fixValue(newValue, precision, true);
  }
};
