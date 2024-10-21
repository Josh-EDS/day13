const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './public/register.html'));
});

app.post('/validateForm', (req, res) => {
    const formData = req.body.form;
    const filePath = path.join(__dirname, './data/submittedForms.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        const formsData = data ? JSON.parse(data) : [];

        const emailExists = formsData.some(entry => entry.email === formData.email);
        if (emailExists) {
            return res.status(400).json({ error: 'This email is already in use' });
        }

        formsData.push(formData);
        fs.writeFile(filePath, JSON.stringify(formsData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Could not save data' });
            res.json({ message: 'Form data saved successfully', data: formData });
        });
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'));
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, './data/submittedForms.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Could not read user data' });
        const users = data ? JSON.parse(data) : [];

        // Check if email exists in the database
        const user = users.find(user => user.email === email);

        // Validate the password directly
        if (user && user.password === password) {
            res.json({ success: true });
        } else {
            res.json({ error: 'Email or password incorrect' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
