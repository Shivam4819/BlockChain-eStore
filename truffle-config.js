const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');

const private_keys = [
  "15ba1e6b83b464b909654805113b638db51ec56c31128a46b65f1d728743148e"
]

module.exports = {
  
  compilers:{
    solc:{
      version: "^0.8.0"
    }
  },

  networks: {
    develop: {
      port: 8545
    },

    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: 'https://rinkeby.infura.io/v3/1e3edc31263c4463a3a69a1925b4c135',
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
