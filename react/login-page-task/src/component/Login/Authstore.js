
import { encryptData, decryptData } from "./Encryption";


export const saveCredentials = (username, password) => {
    const encryptedUser = encryptData(username);
    const encryptedPass = encryptData(password);

    localStorage.setItem("username", encryptedUser);
    localStorage.setItem("password", encryptedPass);
    sessionStorage.setItem("login", true);
};

export const getDecryptedCredentials = () => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (!storedUsername || !storedPassword) return null;

    const decryptedUser = decryptData(storedUsername);
    const decryptedPass = decryptData(storedPassword);

    return { username: decryptedUser, password: decryptedPass };
};


export const clearCredentials = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    sessionStorage.removeItem("login");
};
