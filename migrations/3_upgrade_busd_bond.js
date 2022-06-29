const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0xFc786E7652926629c428A9e31E3FF96A06992ae4";
    }
    if (network === "bscmainnet") {
        proxyAddress = "0xC3d931aE489F994b54cE953cd6b71ed5D8C01b2F";
    }
    await upgradeProxy(proxyAddress, TimeBondDepository, { deployer, unsafeAllow: ["delegatecall"] });
};
