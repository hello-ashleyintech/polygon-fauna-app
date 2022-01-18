const WhitelistForm = artifacts.require("./WhitelistForm.sol");

module.exports = function(deployer) {
  deployer.deploy(WhitelistForm);
};
