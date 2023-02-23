import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import "@fontsource/josefin-sans/700.css"
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import getCurrencyRates from './api/api';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import {
  StyledTableCell,
  StyledTableRow,
  StyledTable,
  StyledTableContainer,
  HeadingRow,
  CellEditBox,
} from './components/TableComponents';
import CellControlBox from './components/CellControl';
import ControlButton from './components/ControlButton';
import {
  CheckRounded,
  HighlightOffRounded,
  SwapHorizRounded,
} from '@mui/icons-material';
import tableTheme from './utils/tableTheme';
import EditButton from './components/EditButton';
import CellInput from './components/CellInput';
import CalculatorBox from './components/CalculatorBox';
import { Button, TextField, Box, Stack, MenuItem, Select, Typography } from '@mui/material';
import {
  onlyDecimals,
  currencyLabels,
  convertCurrency,
  isValidInput,
  fixValue,
  validateNumber
} from './utils/utils';

function App() {
  const [defaultCurrencyRates, setDefaultCurrencyRates] = useState([]);
  const [currencyRates, setCurrencyRates] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currEditable, setCurrEditable] = useState('');
  const [currCellValue, setCurrCellValue] = useState('');

  const [isValid, setIsValid] = useState(true);

  const [currencyForSale, setCurrencyForSale] = useState('UAH');
  const [forSaleValue, setForSaleValue] = useState('');

  const [currencyToBuy, setCurrencyToBuy] = useState('EUR');
  const [toBuyValue, setToBuyValue] = useState('');

  useEffect(() => {
    /* const localCounter = localStorage.getItem('counter') || 0;
    console.log(localCounter)
    if (Number(localCounter) > 3) {
      console.log('true')
      setCurrencyRates([]);
      localStorage.setItem('counter', 0)
    } else { */
      getCurrencyRates().then((res) => {
        setCurrencyRates(res);
        setDefaultCurrencyRates(
          res.map((el) => {
            return { ...el };
          })
        );
        if (res.length === 0) {
          setError(true);
        }
      });
      /* localStorage.setItem('counter', Number(localCounter) + 1);
    } */
  }, []);

  useEffect(() => {
    currencyRates.length > 0 &&
      defaultCurrencyRates.length > 0 &&
      setLoading(false);
  }, [currencyRates.length, defaultCurrencyRates.length]);

  useEffect(() => {
    defaultCurrencyRates.length > 0 &&
      setCurrencyList(['UAH', ...defaultCurrencyRates.map((el) => el.ccy)]);
  }, [defaultCurrencyRates]);

  useEffect(() => {
    setIsValid(true);
  }, [currEditable]);

  const handleEditClick = (id, cellValue) => {
    setCurrEditable(id);
    setCurrCellValue(cellValue);
  };

  const handleCloseClick = () => setCurrEditable('');

  const findDefaultValue = useCallback(
    (currency, operation) => {
      const obj = defaultCurrencyRates.find((el) => el.ccy === currency);
      if (obj) return obj[operation];
    },
    [defaultCurrencyRates]
  );

  const handleCellValueChange = ({ target }, ccy, operation) => {
    const value = findDefaultValue(ccy, operation);
    setIsValid(validateNumber(target.value, value));
    setCurrCellValue(target.value);
  };

  const handleInput = useCallback((e) => {
    !isValidInput(e) && e.preventDefault();
  }, []);

  const handleSubmit = (curr, operation) => {
    setCurrencyRates((prev) =>
      prev.map((el) => {
        if (el.ccy === curr) el[operation] = currCellValue;
        return el;
      })
    );
    setCurrEditable('');
  };

  const handleToBuyValueChange = ({ target }) => {
    onlyDecimals(target.value) && setToBuyValue(target.value);
    forSaleValue !== '' && setForSaleValue('');
  };

  const handleForSaleValueChange = ({ target }) => {
    onlyDecimals(target.value) && setForSaleValue(target.value);
    toBuyValue !== '' && setToBuyValue('');
  };

  const handleCalculateButton = () => {
    const newValue = convertCurrency(
      currencyForSale,
      currencyToBuy,
      forSaleValue,
      toBuyValue,
      currencyRates
    );
    if (forSaleValue) {
      setToBuyValue(newValue);
    } else if (toBuyValue) {
      setForSaleValue(newValue);
    }
  };

  const handleForSaleCurrChange = ({ target }) => {
    setCurrencyForSale(target.value);
    if (forSaleValue && toBuyValue) {
      const newBuyValue = convertCurrency(
        target.value,
        currencyToBuy,
        forSaleValue,
        toBuyValue,
        currencyRates
      );
      setToBuyValue(newBuyValue);
    }
  };
  const handleToBuyCurrChange = ({ target }) => {
    setCurrencyToBuy(target.value);
    if (forSaleValue && toBuyValue) {
      const newBuyValue = convertCurrency(
        currencyForSale,
        target.value,
        forSaleValue,
        toBuyValue,
        currencyRates
      );
      setToBuyValue(newBuyValue);
    }
  };

  const handleSwapButton = () => {
    setCurrencyForSale(currencyToBuy);
    setCurrencyToBuy(currencyForSale);
    if (forSaleValue && toBuyValue) {
      const newBuyValue = convertCurrency(
        currencyToBuy,
        currencyForSale,
        forSaleValue,
        toBuyValue,
        currencyRates
      );
      setToBuyValue(newBuyValue);
    }
  };

  return (
    <ThemeProvider theme={tableTheme}>
      <div className="App">
        <Box
          sx={{
            backgroundColor: tableTheme.palette.primary.main,
            height: '100px',
            padding: '10px 20px',
          }}
          component="header"
        >
          <Typography
            textTransform='uppercase'
            sx={{
              color: 'white',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
              fontFamily: 'Josefin Sans, sans-serif',
              letterSpacing: 1.1
            }}
          >
            Currency <br></br>calculator
          </Typography>
        </Box>
        <Box component="main">
          {!loading && !error && (
            <Box sx={{ padding: '0 20px', textAlign: 'center' }}>
              <StyledTableContainer component={Paper}>
                <StyledTable aria-label="customized table">
                  <TableHead>
                    <HeadingRow>
                      <StyledTableCell align="center">
                        Currency / Current date
                      </StyledTableCell>
                      <StyledTableCell align="center">Buy</StyledTableCell>
                      <StyledTableCell align="center">Sale</StyledTableCell>
                    </HeadingRow>
                  </TableHead>

                  <TableBody>
                    {currencyRates.map((data) => (
                      <StyledTableRow key={`${data.ccy}/${data.base_ccy}`}>
                        {/* Row title */}
                        <StyledTableCell scope="row" align="center">
                          {`${data.ccy}/${data.base_ccy}`}
                        </StyledTableCell>

                        {/* Cell values */}
                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign:
                              currEditable === `${data.ccy}-buy` ? 'top' : '',
                          }}
                        >
                          <EditButton
                            className="edit-button"
                            hidden={currEditable === `${data.ccy}-buy`}
                            handleClick={() =>
                              handleEditClick(
                                `${data.ccy}-buy`,
                                fixValue(data.buy)
                              )
                            }
                          />

                          {/* Submit / cancel buttons for cell input */}
                          <CellEditBox>
                            <CellControlBox
                              hidden={currEditable !== `${data.ccy}-buy`}
                            >
                              <ControlButton
                                handleClick={() =>
                                  handleSubmit(data.ccy, 'buy')
                                }
                                color="success"
                                disabled={!isValid}
                              >
                                <CheckRounded fontSize="small" />
                              </ControlButton>
                              <ControlButton
                                handleClick={handleCloseClick}
                                color="error"
                              >
                                <HighlightOffRounded fontSize="small" />
                              </ControlButton>
                            </CellControlBox>

                            {/* Cell input */}
                            <CellInput
                              hidden={currEditable !== `${data.ccy}-buy`}
                              isValid={isValid}
                              value={fixValue(data.buy)}
                              checkValue={findDefaultValue(data.ccy, 'buy')}
                              handleInput={handleInput}
                              handleChange={(e) =>
                                handleCellValueChange(e, data.ccy, 'buy')
                              }
                            />
                          </CellEditBox>
                          {currEditable !== `${data.ccy}-buy` &&
                            fixValue(data.buy)}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          sx={{
                            verticalAlign:
                              currEditable === `${data.ccy}-sale` ? 'top' : '',
                          }}
                        >
                          <EditButton
                            className="edit-button"
                            hidden={currEditable === `${data.ccy}-sale`}
                            handleClick={() =>
                              handleEditClick(
                                `${data.ccy}-sale`,
                                fixValue(data.sale)
                              )
                            }
                          />

                          {/* Submit / cancel buttons for cell input */}
                          <CellEditBox>
                            <CellControlBox
                              hidden={currEditable !== `${data.ccy}-sale`}
                            >
                              <ControlButton
                                handleClick={() =>
                                  handleSubmit(data.ccy, 'sale')
                                }
                                color="success"
                                disabled={!isValid}
                              >
                                <CheckRounded fontSize="small" />
                              </ControlButton>
                              <ControlButton
                                handleClick={handleCloseClick}
                                color="error"
                              >
                                <HighlightOffRounded fontSize="small" />
                              </ControlButton>
                            </CellControlBox>

                            {/* Cell input */}
                            <CellInput
                              hidden={currEditable !== `${data.ccy}-sale`}
                              isValid={isValid}
                              value={fixValue(data.sale)}
                              checkValue={findDefaultValue(data.ccy, 'sale')}
                              handleInput={handleInput}
                              handleChange={(e) =>
                                handleCellValueChange(e, data.ccy, 'sale')
                              }
                            />
                          </CellEditBox>
                          {currEditable !== `${data.ccy}-sale` &&
                            fixValue(data.sale)}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </StyledTableContainer>

              {/* Currency calculator */}
              <CalculatorBox>
                <Stack
                  direction="row"
                  sx={{
                    '@media screen and (max-width: 480px)': {
                      flexDirection: 'column',
                    },
                    gap: '10px',
                  }}
                >
                  <TextField
                    label="Change"
                    color="primary"
                    value={forSaleValue}
                    inputMode="decimal"
                    onChange={handleForSaleValueChange}
                  />
                  <Select
                    size="small"
                    value={currencyForSale}
                    onChange={handleForSaleCurrChange}
                  >
                    {currencyList.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        disabled={currencyToBuy === option}
                      >
                        {`${currencyLabels[option]} ${option}`}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Button variant="outlined" onClick={handleSwapButton}>
                  <SwapHorizRounded />
                </Button>
                <Stack
                  direction="row"
                  sx={{
                    '@media screen and (max-width: 480px)': {
                      flexDirection: 'column-reverse',
                    },
                    gap: '10px',
                  }}
                >
                  <Select
                    size="small"
                    value={currencyToBuy}
                    onChange={handleToBuyCurrChange}
                  >
                    {currencyList.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        disabled={currencyForSale === option}
                      >
                        {`${currencyLabels[option]} ${option}`}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    label="Get"
                    color="primary"
                    value={toBuyValue}
                    inputMode="decimal"
                    onChange={handleToBuyValueChange}
                  />
                </Stack>
              </CalculatorBox>
              <Button
                disabled={!toBuyValue && !forSaleValue}
                onClick={handleCalculateButton}
                variant="contained"
                size="large"
                fullWidth
                sx={{ maxWidth: '200px' }}
              >
                Calculate
              </Button>
            </Box>
          )}
          {loading && !error && <span>Loading....</span>}

          {/* Error message */}
          {error && (
            <p style={{ color: 'red' }}>
              Some error occured. Please, try again later....
            </p>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: tableTheme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            marginTop: 'auto',
            color: 'white',
            padding: '10px 20px',
          }}
          component="footer"
        >
          2023 All rights reserved ©
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;