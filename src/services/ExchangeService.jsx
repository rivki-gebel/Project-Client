import axios from 'axios';

//store the fetched data in local storage in order to Reduce server calls.
// the data will be refreshed every 24 hours

const cacheExpirationTime = 24 * 60 * 60 * 1000; // Cache expiration time in milliseconds (1 day)

const ExchangeService = {
    fetchExchanges: async (currency) => {
        const key = currency;

        // Retrieve cached data from local storage
        const cachedData = JSON.parse(localStorage.getItem(key));

        // Check if the data is cached and not expired
        if (cachedData && Date.now() - cachedData.timestamp < cacheExpirationTime) {
            console.log('Using cached data for currency:', key);
            return cachedData.data;
        }

        try {
            const response = await axios.get(`https://localhost:7172/currencyExchange/exchangeRates/${key}`);
            const exchangeData = response.data;
            console.log("Fetching exchange rates for currency:", key);
            
            // Store the fetched data in local storage
            localStorage.setItem(key, JSON.stringify({
                data: exchangeData,
                timestamp: Date.now()
            }));

            return exchangeData;
        } catch (error) {
            console.error('Error fetching currencies:', error);
            return [];
        }
    }
};

export default ExchangeService;