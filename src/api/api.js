export async function fetchData(url) {
  try {
    const response = await fetch(url);
    const jsonReponse = await response.json();
    return jsonReponse;
  } catch (e) {
    const message = `Failed to fetch ${url}. Error: ${e}`;
    throw new Error(message);
  }
}

const getBtcRate = async () => {
  const data = await fetchData('https://blockchain.info/ticker');
  const result = [{
    ccy: 'BTC',
    base_ccy: 'USD',
    buy: (data.USD.buy).toString(),
    sale: (data.USD.sell).toString(),
  }];
  return result;
};

export default async function getCurrencyRates() {
  const localCounter = Number(localStorage.getItem('counter') || 0);
  if(localCounter >= 5) {
    console.log('hello')
    localStorage.setItem('counter', 0)
    console.error('Failed to fetch data')
    return [];
  } else {
    localStorage.setItem('counter', localCounter + 1)
    console.log(localCounter)
  }
  console.log(localCounter)
  const results = await Promise.allSettled([
    fetchData(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    ),
    getBtcRate(),
  ]);
  if (results.every(res => res.status === 'fulfilled')) {
    const [ curr, btc ] = results;
    return [...curr.value, ...btc.value];
  }
  const rejected = results.find(res => res.status === 'rejected');
  console.error(rejected.reason);
  return [];
}
