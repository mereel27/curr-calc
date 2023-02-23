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
  const localCounter = localStorage.getItem('counter');

  if(localCounter && localCounter >= 4) {
    console.error('Server fail, status 404')
    return [];
  }

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
