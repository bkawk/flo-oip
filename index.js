const HDMW = require('oip-hdmw')
const Wallet = HDMW.Wallet;

const options = {
    discover: false,
    supported_coins: ['flo'],
    networks: [],
}
const myWallet = new Wallet('carbon panda replace drum guess heart inside useless random bulb hint industry', options);
const coins = myWallet.getCoins()

console.log('My Wallets Coins:')
console.log(coins)

