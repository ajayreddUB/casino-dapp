const casinoChip = artifacts.require("../contracts/CasinoChip");
const casinoNFT = artifacts.require("../contracts/CasinoNFT");
const casino1155 = artifacts.require("../contracts/CasinoItems");

module.exports = function (deployer, network, accounts) {
  const initialOwner = accounts[0]; // First account as the initial owner

  deployer.deploy(casinoChip, 1000000).then(function () {
    return deployer.deploy(casinoNFT, initialOwner); // Pass the initial owner to the constructor
  }).then(function () {
    return deployer.deploy(casino1155, casinoChip.address, casinoNFT.address);
  });
};
