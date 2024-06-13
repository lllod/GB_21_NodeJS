const { generatePassword } = require('lllod-secure-password-generator');

let password = generatePassword();
console.log(password);

password = generatePassword({ length: 16, useSpecialChars: false });
console.log(password);

password = generatePassword({ length: 8, useNumbers: false, useSpecialChars: false });
console.log(password);

password = generatePassword({ length: 20, useLetters: false });
console.log(password);