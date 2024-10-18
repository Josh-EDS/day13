window.onload = () => {
    const addButton = document.getElementById('add-quote-button');
    addButton.addEventListener('click', addNewQuote);
};

async function addNewQuote() {
    const quoteInput = document.getElementById('quote-input').value;
    const authorInput = document.getElementById('author-input').value;

    if (!quoteInput || !authorInput) {
        alert("Please enter both a quote and an author.");
        return;
    }

    try {
        const response = await fetch('/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quote: quoteInput,
                author: authorInput
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error adding quote: ' + errorData.error);
        }

        const data = await response.json();
        console.log('Quote added successfully:', data);
        alert('Quote added successfully!');
    } catch (error) {
        console.error('Error adding quote:', error);
        alert(error.message);
    }
}
