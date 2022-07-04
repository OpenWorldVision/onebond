const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0xbBa26d77286148c325E14d83be0129990dad7395";
    }
    if (network === "bscmainnet") {
        proxyAddress = "0xC3d931aE489F994b54cE953cd6b71ed5D8C01b2F";
    }
    if (network === "harmony") {
        proxyAddress = "0x81a527e2f7c681be45cAaDAa8d2B4fB79264526F";
    }
    await upgradeProxy(proxyAddress, TimeBondDepository, { deployer, unsafeAllow: ["delegatecall"] });
};
