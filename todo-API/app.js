const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Route for main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for EXERCISE 03 (Quote of the day)
app.get('/ex_03', (req, res) => {
    res.sendFile(__dirname + '/public/ex_03.html');
});

// Route for EXERCISE 03BIS (Submit your favorite quote)
app.get('/ex_03bis', (req, res) => {
    res.sendFile(__dirname + '/public/ex_03bis.html');
});

// Proxy route for adding a new quote to FavQs API
app.post('/api/quotes', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://favqs.com/api/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token e6c29aadf1ebc31dd38c3a6811bf67cd',
            },
            body: JSON.stringify({
                quote: {
                    body: req.body.quote,
                    author: req.body.author
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from FavQs:', errorData);
            return res.status(response.status).json({ error: errorData });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error adding quote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    console.clear();
    alert('Quote added sucessfully')
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
