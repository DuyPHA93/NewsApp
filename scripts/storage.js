'use strict';

const notSupportStorageMessage = 'Sorry, your browser does not support web storage...';
const storagePrefix = 'PRF192x_2.1-A_VN-Assignment_3-';

function checkBrowser() {
    // Check the browser support Storage
    if (typeof(Storage) === "undefined") {
        alert(notSupportStorageMessage);
        return false;
    }

    return true;
}

function saveToStorage(key, value) {
    // Check the browser support Storage
    if (!checkBrowser()) return false;

    // Set item
    localStorage.setItem(storagePrefix + key, value);

    return true;
}

function getFromStorage(key) {
    // Check the browser support Storage
    if (!checkBrowser()) return false;

    return localStorage.getItem(storagePrefix + key);
}

function removeFromStorage(key) {
    // Check the browser support Storage
    if (!checkBrowser()) return;

    // Remove item
    localStorage.removeItem(storagePrefix + key);

    return true;
}

function saveToSession(key, value) {
    // Check the browser support Storage
    if (!checkBrowser()) return false;

    // Set item
    sessionStorage.setItem(storagePrefix + key, value);

    return true;
}

function getFromSession(key) {
    // Check the browser support Storage
    if (!checkBrowser()) return false;

    return sessionStorage.getItem(storagePrefix + key);
}

function removeFromSession(key) {
    // Check the browser support Storage
    if (!checkBrowser()) return false;

    // Remove item
    sessionStorage.removeItem(storagePrefix + key);

    return true;
}