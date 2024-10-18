document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const fetchButton = document.getElementById('fetch-quote');

    const fetchQuoteOfTheDay = async () => {
        try {
            const response = await fetch('/api/qotd');
            const data = await response.json();
            quoteText.textContent = data.quote.body; // Ensure this matches the API response structure
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    fetchButton.addEventListener('click', fetchQuoteOfTheDay);
});
