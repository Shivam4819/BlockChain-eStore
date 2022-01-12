var EBookToken = artifacts.require("./EBookToken.sol");

module.exports = function(deployer) {
  deployer.deploy(EBookToken,1000);
};
