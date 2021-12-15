const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const XBladeBond30Depository = artifacts.require("XBladeBond30Depository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0x860bd4B4dB93028bd5000C7eC5f743abEA188296";
    }
    if (network === "bscmainnet") {
        proxyAddress = "";
    }
    await upgradeProxy(
        proxyAddress,
        XBladeBond30Depository,

        { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    );
};
