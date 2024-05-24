import axios from 'axios';

const ExchangeService = {
    fetchExchanges: async (currency) => {
        try {
            const response = await axios.get(`https://localhost:7172/currencyExchange/exchangeRates/${currency}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching currencies:', error);
            return [];
        }
    }
};

export default ExchangeService;