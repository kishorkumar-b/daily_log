

import Cryptojs from 'crypto-js';

const encrypted = Cryptojs.AES.encrypt("username123", "secretKey123").toString();
console.log(encrypted);

const bytes = Cryptojs.AES.decrypt(encrypted, "secretKey123");
console.log(bytes);

const decrypted = bytes.toString(Cryptojs.enc.Utf8);
console.log(decrypted);

