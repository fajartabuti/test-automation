let fn = {};

fn.removeCurrency = (text) => {
    text = text.replace('.', '').replace('Rp', '');

    return text;
};

fn.getRandomAlphabet = (a) => {
    let text = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < a; i++) {
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return text;
};

module.exports = fn;