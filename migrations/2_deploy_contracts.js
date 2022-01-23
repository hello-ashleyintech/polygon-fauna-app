const Allowlist = artifacts.require("./Allowlist.sol");

module.exports = function (deployer) {
  deployer.deploy(Allowlist);
};
