import {
  convertCurrency,
  isValidInput,
  onlyDecimals,
  validateNumber,
} from './utils';

const mockData = [
  { ccy: 'EUR', base_ccy: 'UAH', buy: '40.70000', sale: '41.70000' },
  { ccy: 'USD', base_ccy: 'UAH', buy: '39.00000', sale: '39.50000' },
  { ccy: 'BTC', base_ccy: 'USD', buy: '23931.31', sale: '23931.31' },
];

const mockEventObject = (key, type) => {
  return {
    key,
    type,
    clipboardData: {
      getData() {
        return this.key;
      },
    },
  };
};

describe('convert currency', () => {
  it('returns 3900', () => {
    expect(convertCurrency('USD', 'UAH', 100, '', mockData)).toBe(3900);
  });
  it('return 93,52', () => {
    expect(convertCurrency('USD', 'EUR', 100, '', mockData)).toBe(93.525);
  });
  it('return 5.128', () => {
    expect(convertCurrency('USD', 'UAH', '', 200, mockData)).toBe(5.128);
  });
  it('return 0.0412573224', () => {
    expect(convertCurrency('USD', 'BTC', '1000', '', mockData)).toBe(
      0.0412573224
    );
  });
});

describe('convert BTC to non-USD', () => {
  it('returns 933321.09', () => {
    expect(convertCurrency('BTC', 'UAH', 1, '', mockData)).toBe(933321.09);
  });
  it('returns 0.0000010579', () => {
    expect(convertCurrency('UAH', 'BTC', 1, '', mockData)).toBe(0.0000010579);
  });
  it('returns 2322571.855', () => {
    expect(convertCurrency('EUR', 'BTC', '', 100, mockData)).toBe(2322571.855);
  });
  it('returns 0.2233957876', () => {
    expect(convertCurrency('BTC', 'EUR', '', 5000, mockData)).toBe(
      0.2233957876
    );
  });
});

describe('allows only decimal in cell input', () => {
  it('returns true', () => {
    const pass = ['1', '2', 'f', 'Backspace'].every((el) =>
      isValidInput(mockEventObject(el))
    );
    const pass2 = ['E', 'e', '--', '-', '+'].every(
      (el) => !isValidInput(mockEventObject(el))
    );
    expect(pass).toBe(true);
    expect(pass2).toBe(true);
  });
  it('returns false', () => {
    const pass = ['E', 'e', '--', '-', '+'].some((el) =>
      isValidInput(mockEventObject(el))
    );
    const pass2 = ['E', 'e', '--', '-', '+'].some((el) =>
      isValidInput(mockEventObject(el, 'past'))
    );
    expect(pass).toBe(false);
    expect(pass2).toBe(false);
  });
});

describe('allows only decimal in currency calculator input', () => {
  it('returns false', () => {
    const pass = onlyDecimals(',213231.3');
    const pass2 = onlyDecimals('00015');
    const pass3 = onlyDecimals('0hel21o');
    expect(pass).toBe(false);
    expect(pass2).toBe(false);
    expect(pass3).toBe(false);
  });
  it('returns true', () => {
    const pass = onlyDecimals('0.5');
    const pass2 = onlyDecimals('1235');
    const pass3 = onlyDecimals('1235,23');
    expect(pass).toBe(true);
    expect(pass2).toBe(true);
    expect(pass3).toBe(true);
  });
});

describe('Checks if the number is greater or less than the base number by 10%', () => {
  it('returns true if number differs by less than 10%', () => {
    const pass = validateNumber('18', '20');
    const pass2 = validateNumber('99.34', 91);
    expect(pass).toBe(true);
    expect(pass2).toBe(true);
  });
  it('returns false if number differs by more than 10%', () => {
    const pass = validateNumber('14', '20');
    const pass2 = validateNumber('100', 84);
    expect(pass).toBe(false);
    expect(pass2).toBe(false);
  });
});
