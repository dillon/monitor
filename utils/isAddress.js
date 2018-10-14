"use strict";
exports.__esModule = true;
// code from official ethereum_js repository (and ported to ts)
// https://github.com/ethereum/go-ethereum/blob/aa9fff3e68b1def0a9a22009c233150bf9ba481f/jsre/ethereum_js.go
var sha3_1 = require("crypto-js/sha3");
exports.isWallet = function (wallet) {
    return isAddress(wallet.address);
};
/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    }
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    }
    else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};
/**
* Checks if the given string is a checksummed address
*
* @method isChecksumAddress
* @param {String} address the given HEX adress
* @return {Boolean}
*/
var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x', '');
    var addressHash = sha3_1(address.toLowerCase());
    for (var i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
