function generatePassword(options = {}) {
    const {
        length = 12,
        useLetters = true,
        useNumbers = true,
        useSpecialChars = true
    } = options;

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (useLetters) charset += letters;
    if (useNumbers) charset += numbers;
    if (useSpecialChars) charset += specialChars;

    if (!charset) throw new Error('Необходимо выбрать минимум один набор символов!');

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

module.exports = { generatePassword };
