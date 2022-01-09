// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };

var EBook = artifacts.require("./EBookShop.sol");

module.exports = function(deployer) {
  deployer.deploy(EBook);
};
