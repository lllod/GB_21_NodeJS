const http = require('http');
const url = require('url');

let indexViews = 0;
let aboutViews = 0;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        indexViews++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<html>
                    <head><title>Главная</title></head>
                    <body>
                        <h1>Главная страница</h1>
                        <p>Просмотров данной страницы: ${indexViews}.</p>
                        <a href="/about">Перейти на страницу "О нас"</a>
                    </body>
                 </html>`);
    } else if (parsedUrl.pathname === '/about') {
        aboutViews++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<html>
                    <head><title>О нас</title></head>
                    <body>
                        <h1>О нас</h1>
                        <p>Просмотров данной страницы: ${aboutViews}.</p>
                        <a href="/">Перейти на главную страницу</a>
                    </body>
                 </html>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<html>
                    <head><title>404</title></head>
                    <body>
                        <h1>404 - Страница не найдена</h1>
                        <a href="/">Вернуться на главную страницу</a>
                    </body>
                 </html>`);
    }
});

server.listen(3000, () => {
    console.log('Сервер запущен | Порт 3000');
});
