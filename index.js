require('dotenv').config();
const Wallet = require('oip-hdmw').Wallet;
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./storage');


const options = {
    discover: false,
    supported_coins: [process.env.NET],
    networks: [],
    //serialized_data: JSON.parse(localStorage.getItem('oip-hdmw'))
}


function makeWallet() {
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

function makeFloTransaction(myWallet, address, amount, floData) {
    return new Promise((resolve, reject) => {
        myWallet.sendPayment({
            to: { [address]: amount }, floData
        })
        .then(txid => {
            resolve(txid);
            localStorage.setItem('oip-hdmw', JSON.stringify(myWallet.serialize(), null, 4))
        })
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
        return makeFloTransaction(wallet[0], getFloAddress(wallet[1]), 0.001, "Test Data9")
    })
    .then((txData) => {
        console.log(txData)
     })
     .catch((error) => {
        console.log(error)
     })
}());






