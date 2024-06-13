# Генератор паролей

Бибилиотека для генерации паролей.

## Установка

```sh
npm install lllod-secure-password-generator
```
## Использование

```javascript
const { generatePassword } = require('secure-password-generator');

// Генерация пароля с дефолтными настройками
let password = generatePassword();
console.log(password);

// Генерация 16-символьного пароля из букв и цифр
password = generatePassword({ length: 16, useSpecialChars: false });
console.log(password);

// Генерация 8-символьного пароля из букв
password = generatePassword({ length: 8, useNumbers: false, useSpecialChars: false });
console.log(password);

// Генерация 20-символьного пароля из цифр и спецсимволов
password = generatePassword({ length: 20, useLetters: false });
console.log(password);

```
