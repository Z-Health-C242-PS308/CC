const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc'; // Algoritma enkripsi
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encrypted) {
    // Pisahkan IV dan teks terenkripsi

    // console.log(encrypted)

    const parts = encrypted.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const content = parts[1];
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log(decrypted)

    return decrypted;
}

module.exports = { encrypt, decrypt }