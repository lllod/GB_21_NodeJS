const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.json());

const loadUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения файла пользователей:', error);
        return [];
    }
};

const saveUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка записи файла пользователей:', error);
    }
};

app.get('/users', (req, res) => {
    const users = loadUsers();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const users = loadUsers();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

app.post('/users', (req, res) => {
    const users = loadUsers();
    const newUser = { id: String(Date.now()), ...req.body };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const users = loadUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        saveUsers(users);
        res.json(users[index]);
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

app.delete('/users/:id', (req, res) => {
    const users = loadUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        saveUsers(users);
        res.json(deletedUser);
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен | Порт ${PORT}`);
});
