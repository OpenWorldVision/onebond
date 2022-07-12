const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    // let proxyAddress;
    // if (network === "bsctestnet") {
    //     proxyAddress = "0x2149905D691Bff215084Ab491474EF1848dD7B44";
    // }
    // if (network === "bscmainnet") {
    //     proxyAddress = "0xC3d931aE489F994b54cE953cd6b71ed5D8C01b2F";
    // }
    // if (network === "harmony") {
    //     proxyAddress = "0x81a527e2f7c681be45cAaDAa8d2B4fB79264526F";
    // }
    // await upgradeProxy(proxyAddress, TimeBondDepository, { deployer, unsafeAllow: ["delegatecall"] });
    const t = await TimeBondDepository.at("0xDC4DAF1b62a0aA93aAE8ba5DA685d5178E9F19aA");
    await t.setSalePrice("18500000000000000");
};
