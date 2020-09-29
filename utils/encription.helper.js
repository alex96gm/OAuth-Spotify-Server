
const CryptoJS = require('crypto-js');

module.exports.encrypt = function (text) {
    return CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_SECRET).toString();
}

module.exports.decrypt = function (text) {
    const bytes = CryptoJS.AES.decrypt(text, process.env.ENCRYPTION_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}
