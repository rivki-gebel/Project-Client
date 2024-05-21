import React, { useState, useEffect } from 'react';
import ExchangeService from '../../services/ExchangeService';
import CurrenciesSelect from '../currenciesSelect/CurrenciesSelect';
import ExchangeRateTable from '../table/ExchangeRateTable';

const Exchange = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState([]);

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
        <div>
            <CurrenciesSelect
                selectedCurrency={selectedCurrency}
                onCurrencyChange={handleCurrencyChange}
            />
            <ExchangeRateTable exchangeRates={exchangeRates} />
        </div>
    );
};

export default Exchange;