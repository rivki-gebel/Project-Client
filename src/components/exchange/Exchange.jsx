import React, { useState, useEffect } from 'react';
import ExchangeService from '../../services/ExchangeService';
import CurrenciesSelect from '../currenciesSelect/CurrenciesSelect';
import ExchangeRateTable from '../table/ExchangeRateTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Exchange = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
 
    useEffect(() => {
        fetchExchangeRates(selectedCurrency);
    }, [selectedCurrency]);

    const fetchExchangeRates = (currency) => {
        ExchangeService.fetchExchanges(currency)
            .then(data => {
                setExchangeRates(data);
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };

    return (
        <>
        {console.log("ex",exchangeRates)}
            {Object.keys(exchangeRates).length === 0  ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%' }}>
                    <CurrenciesSelect
                        selectedCurrency={selectedCurrency}
                        onCurrencyChange={handleCurrencyChange}
                    />
                    <ExchangeRateTable exchangeRates={exchangeRates} />
                </div>
            )}
        </>
    );
};

export default Exchange;