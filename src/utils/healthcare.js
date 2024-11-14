import web3 from './web3';
import Healthcare from '../contracts/Healthcare.json';

const instance = new web3.eth.Contract(
    Healthcare.abi,
    'deployed_contract_address_here' // Replace with deployed contract address
);

export default instance;
