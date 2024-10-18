const express = require('express');
const router = express.Router();
const fs = require('fs');
const dataFilePath = './data.json';

router.get('/todo', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).send('Server error');
        const todos = JSON.parse(data);
        res.json(todos);
    });
});

router.post('/todo', (req, res) => {
    const newTask = req.body;
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).send('Server error');
        const todos = JSON.parse(data);
        todos.todo.push(newTask);
        fs.writeFile(dataFilePath, JSON.stringify(todos), (err) => {
            if (err) return res.status(500).send('Server error');
            res.status(201).json(newTask);
        });
    });
});

router.delete('/todo/:id', (req, res) => {
    const taskId = req.params.id;
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).send('Server error');
        let todos = JSON.parse(data);
        todos.todo = todos.todo.filter(task => task.id !== taskId);
        fs.writeFile(dataFilePath, JSON.stringify(todos), (err) => {
            if (err) return res.status(500).send('Server error');
            res.status(204).send();
        });
    });
});

router.put('/todo/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).send('Server error');
        let todos = JSON.parse(data);
        todos.todo = todos.todo.map(task => (task.id === taskId ? { ...task, title: updatedTask.title } : task));
        fs.writeFile(dataFilePath, JSON.stringify(todos), (err) => {
            if (err) return res.status(500).send('Server error');
            res.json(updatedTask);
        });
    });
});

module.exports = router;
