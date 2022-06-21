const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let proxyAddress;
    if (network === "bsctestnet") {
        proxyAddress = "0xf6C4491f5d06d73e48e0a50833a5cDf218729C6c";
    }
    if (network === "bscmainnet") {
        proxyAddress = "0xC3d931aE489F994b54cE953cd6b71ed5D8C01b2F";
    }
    // await upgradeProxy(
    //     proxyAddress,
    //     TimeBondDepository,

    //     { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    // );

    const contractBond = await TimeBondDepository.at(proxyAddress);
    await contractBond.manualBuyBack();
};
