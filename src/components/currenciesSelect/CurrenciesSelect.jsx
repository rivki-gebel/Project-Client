import React, { useState, useEffect } from 'react';
import CurrenciesService from '../../services/CurrenciesService';
import '@fontsource/inter';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function CurrenciesSelect( {selectedCurrency,onCurrencyChange})  {

    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        CurrenciesService.fetchCurrencies()
            .then(data => {
                const filteredCurrencies = data.filter(currency =>
                    ["EUR", "ILS", "USD", "GBP", "CNY"].includes(currency[0])
                );
                setCurrencies(filteredCurrencies);
            })
            .catch(error => {
                console.error('Error fetching currencies:', error);
            });
    }, []);

    const handleCurrencyChange = (value) => {
        
        console.log("in handle currency change",value)
        onCurrencyChange(value);
    };
 
    return (
        <Select  onChange={(event) => handleCurrencyChange(event.target.textContent)}
            variant="soft"
            placeholder="Select a currency"
            indicator={<KeyboardArrowDown />}
            sx={{
                width: 240,
                [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                    },
                },
            }}
        >
            {currencies.map(currency => (
                <Option value={currency} key={currency}>{currency[0]}</Option>
            )) }
        </Select>

    );
}

export default CurrenciesSelect;