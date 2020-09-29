
var CryptoJS = require('crypto-js');

module.exports.encrypt = function (text) {
    return CryptoJS.AES.encrypt(text, ENCRYPTION_SECRET).toString();
}

module.exports.decrypt = function (text) {
    var bytes = CryptoJS.AES.decrypt(text, ENCRYPTION_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}
