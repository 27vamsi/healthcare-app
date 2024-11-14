import Web3 from 'web3';

let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else {
    console.log('MetaMask is required');
}

export default web3;
