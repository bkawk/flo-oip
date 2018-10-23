require('dotenv').config();
const Wallet = require('oip-hdmw').Wallet;
const bip39 = require('bip39');

const options = {
    discover: false,
    supported_coins: [process.env.NET],
    networks: [],
}


function makeWallet() {
    console.log(bip39.generateMnemonic())
    console.log(new Wallet().getMnemonic()); 
} 

function makeWalletFromMnemonic(mnemonic) {
    return new Promise((resolve, reject) => {
        resolve(new Wallet(mnemonic, options)) ;
    })
} 

function getFloAddress(myWallet) {  
    return myWallet.getCoin(process.env.NET).getMainAddress().getPublicAddress()
} 

function makeFloTransaction(fromWallet, address, amount, floData) {
    return new Promise((resolve, reject) => {
        fromWallet.sendPayment({
            to: { [address]: amount }, floData
        })
        .then(txid => resolve(txid))
        .catch(error => reject(error))
    }) 
}


(function () {
    let acc1 = '';
    let acc2 = '';
    if (process.env.NET === 'flo_testnet'){
        acc1 = process.env.TESTNET1;
        acc2 = process.env.TESTNET2;
    } else {
        acc1 = process.env.MAINNET1;
        acc2 = process.env.MAINNET2;
    }
    Promise.all([makeWalletFromMnemonic(acc1), makeWalletFromMnemonic(acc2)])
    .then((wallet) => {
        console.log(wallet);
        // return makeFloTransaction(wallet[0], getFloAddress(wallet[1]), 0.001, "Test Data6")
    })
    .then((txData) => {
        console.log(txData)
     })
     .catch((error) => {
        console.log(error)
     })
}());






