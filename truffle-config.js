const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv =require('dotenv').config()


const private_keys = [
  process.env.PRV_KEY
]

module.exports = {
  
  compilers:{
    solc:{
      version: "^0.8.0"
    }
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: process.env.INFURA,
        numberOfAddresses: 1
      }),
      network_id: 4,       
      gas: 5500000,        
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true     
    }
  }
};
