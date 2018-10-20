require('dotenv').config();
const Wallet = require('oip-hdmw').Wallet;

const options = {
    discover: false,
    supported_coins: [process.env.NET],
    networks: [],
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

function makeFloTransaction(fromWallet, address, amount, floData) {
    console.log(fromWallet);
    return new Promise((resolve, reject) => {
        fromWallet.sendPayment({
            to: { "oTJ9QrMvg3Uh76dHd9etfjhpqfdv8KKBfN": amount }, floData
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
        return makeFloTransaction(wallet[0], getFloAddress(wallet[1]), 0.001, "Test Data")
    })
    .then((txData) => {
        console.log(txData)
     })
     .catch((error) => {
        console.log(error)
     })
}());






