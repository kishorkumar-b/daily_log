import CryptoJS from "crypto-js";

const secretKey = "mySecretKey123";

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
