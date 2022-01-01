// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };

var EBook = artifacts.require("./EBook.sol");

module.exports = function(deployer) {
  deployer.deploy(EBook);
};
