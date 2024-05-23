import React, { useState, useEffect } from 'react';
import CurrenciesService from '../../services/CurrenciesService';
import '@fontsource/inter';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const CurrenciesSelect = ({ selectedCurrency, onCurrencyChange }) => {

    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        CurrenciesService.fetchCurrencies()
            .then(data => {
                const filteredCurrencies = data.filter(currency =>
                    ["EUR", "ILS", "USD", "GBP", "CNY"].includes(currency.code)
                );
                setCurrencies(filteredCurrencies);
            })
            .catch(error => {
                console.error('Error fetching currencies:', error);
            });
    }, []);

    const handleCurrencyChange = (value) => {
        onCurrencyChange(value);
    };

    return (

        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <Select className='currencies-select'
                value={selectedCurrency}
                onChange={(event) => handleCurrencyChange(event.target.value)}
                input={<OutlinedInput />}
                inputProps={{ 'aria-label': 'Without label' }}
                color='primary'
            >
                {currencies.map(currency => (
                    <MenuItem value={currency.code} key={currency.code}>
                        <img src={`https://www.xe.com/svgs/flags/${currency.code.toLowerCase()}.static.svg`} alt="flag" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
                        {currency.code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CurrenciesSelect;