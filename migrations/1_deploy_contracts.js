var EBook = artifacts.require("./EBookShop.sol");
var EBookToken = artifacts.require("./EBookToken.sol");

module.exports = function(deployer) {
  deployer.deploy(EBook);
  deployer.deploy(EBookToken,10000000);
};
// module.exports = function(deployer) {
//   deployer.deploy(EBookToken,10000000);
// };
