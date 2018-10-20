const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

// let myWallet = new Wallet();
//const mnemonic = myWallet.getMnemonic()

const myWallet = new Wallet('carbon panda replace drum guess heart inside useless random bulb hint industry');
const coins = myWallet.getCoins()

console.log(`My Wallets Coins: ${coins}`)
//console.log(`My Mnemonic:${mnemonic}`)
