import axios from 'axios';

const CurrenciesService = {
    fetchCurrencies: async () => {
        try {
            const response = await axios.get('https://localhost:7205/api/Currencies');
            return response.data;
        } catch (error) {
            console.error('Error fetching currencies:', error);
            return [];
        }
    }
};

export default CurrenciesService;