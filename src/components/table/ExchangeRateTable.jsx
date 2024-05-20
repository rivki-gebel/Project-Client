import React from 'react';

const ExchangeRateTable = ({ exchangeRates }) => (

    <table>
        <thead>
            <tr>
                <th>Base Currency</th>
                <th>Other Currency</th>
                <th>Exchange Rate</th>
            </tr>
        </thead>
        <tbody>
            {console.log("exchangeRates", exchangeRates)}
            {exchangeRates.map(rate => (
                <tr key={rate.base_code}>
                    <td>{rate.base_code}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ExchangeRateTable;