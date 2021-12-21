const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0x89635b79C155aE3A61198Ab194014208F4598c4f";
    }
    if (network === "bscmainnet") {
        proxyAddress = "";
    }
    await upgradeProxy(
        proxyAddress,
        TimeBondDepository,

        { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    );
};
