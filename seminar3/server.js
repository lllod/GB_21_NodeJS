const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const COUNT_FILE = path.join(__dirname, 'count.json');

const loadCount = () => {
    try {
        const data = fs.readFileSync(COUNT_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения файла счетчика:', error);
        return { "/": 0, "/about": 0 };
    }
};

const saveCount = (count) => {
    try {
        fs.writeFileSync(COUNT_FILE, JSON.stringify(count, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка записи файла счетчика:', error);
    }
};

let count = loadCount();

app.get('/', (req, res) => {
    count['/']++;
    saveCount(count);
    res.send(`
        <html>
            <head><title>Главная</title></head>
            <body>
                <h1>Главная страница</h1>
                <p>Просмотров данной страницы: ${count['/']}.</p>
                <a href="/about">Перейти на страницу "О нас"</a>
            </body>
        </html>
    `);
});

app.get('/about', (req, res) => {
    count['/about']++;
    saveCount(count);
    res.send(`
        <html>
            <head><title>О нас</title></head>
            <body>
                <h1>О нас</h1>
                <p>Просмотров данной страницы: ${count['/about']}.</p>
                <a href="/">Перейти на главную страницу</a>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен | Порт ${PORT}`);
});
