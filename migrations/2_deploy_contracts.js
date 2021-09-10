var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var VolcanoToken = artifacts.require("./VolcanoToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(VolcanoToken);
};
