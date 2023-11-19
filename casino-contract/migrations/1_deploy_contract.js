var Casino = artifacts.require("CasinoChip");

module.exports = function(deployer) {
  deployer.deploy(Casino,100000);
};