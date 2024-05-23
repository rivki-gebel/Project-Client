import React, { useState, useEffect } from 'react';
import ExchangeService from '../../services/ExchangeService';
import CurrenciesSelect from '../currenciesSelect/CurrenciesSelect';
import ExchangeRateTable from '../table/ExchangeRateTable';

const Exchange = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchExchangeRates(selectedCurrency);
    }, [selectedCurrency]);

    const fetchExchangeRates = (currency) => {
        setIsLoading(true);
        ExchangeService.fetchExchanges(currency)
            .then(data => {
                setExchangeRates(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                setIsLoading(false);
            });
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%' }}>
            <CurrenciesSelect
                selectedCurrency={selectedCurrency}
                onCurrencyChange={handleCurrencyChange}
            />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ExchangeRateTable exchangeRates={exchangeRates} />
            )}
            {/* <ExchangeRateTable exchangeRates={exchangeRates} /> */}
        </div>
    );
};

export default Exchange;