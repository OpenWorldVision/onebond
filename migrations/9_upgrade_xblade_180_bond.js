const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const xBladeBond180Depository = artifacts.require("xBladeBond180Depository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0x2CC6D07871A1c0655d6A7c9b0Ad24bED8f940517";
    }
    if (network === "bscmainnet") {
        proxyAddress = "0x80EB989BB8D2735fA329797503476aCee6c4EAB2";
    }
    await upgradeProxy(
        proxyAddress,
        xBladeBond180Depository,

        { deployer, initializer: "initialize", unsafeAllow: ["delegatecall"] },
    );
};
