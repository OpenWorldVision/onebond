const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0x63F010B357Bd1188e18111D01C3D1Db7dc13D4a3";
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
