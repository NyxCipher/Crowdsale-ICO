const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider= require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      network_id: "*"
    },
    ganache_local:{
    	provider: function() {
    		return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:8545", MetaMaskAccountIndex)
    	},
    	network_id: 1590663561383
    },
   ropsten_infura: {
    	provider: function() {
    		return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/{code}", MetaMaskAccountIndex)
    	},
    	network_id: 3
    },
    rinkeby_infura: {
    	provider: function () {
    		return new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/{code}", MetaMaskAccountIndex)
    	},
    	network_id: 4
    }
    },
  compilers: {
  	solc: {
  		version: "0.6.2"
  	}
  }
};
