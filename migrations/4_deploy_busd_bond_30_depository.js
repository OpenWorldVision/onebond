const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const XBladeBond30Depository = artifacts.require("XBladeBond30Depository");

module.exports = async function (deployer, network) {
    let router = "";
    let token = "";
    let busdAddress = "";
    let pancakeAggregator = "";
    let BUSD = "";
    let pancakeRouter = "";
    if (network === "bsctestnet") {
        router = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3"; // Pancake Router
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        busdAddress = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
        pancakeAggregator = "0x5bff64D782D7A4977a4435453d3A538983F34Ae6";
        BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
        pancakeRouter = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3";
    }

    if (network === "bscmainnet") {
        router = "";
        token = "";
        busdAddress = "";
    }
    const xBladeBond = await deployProxy(
        XBladeBond30Depository,
        [
            token, // xBlade (receive token)
            BUSD, // Token to buy xBlade
            "0xc3ba116d38ccac8f9ccb18f20e24fcd3de2f3ea0", // Game address to receive bonus from bond
            pancakeAggregator, // Price feed from Pancake,
            pancakeRouter,
        ],
        { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    );

    const minimumTerm = "216000"; // 60 hours
    const minimumPrice = "0"; // 0.05 USD
    const maxPayout = 28; // 0.9%
    const initialDebt = 0;
    const maxDebt = "28000000000000000000000"; // Max 28.000 xBlade
    const discount = 25; // 25%

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(minimumPrice, maxPayout, maxDebt, initialDebt, minimumTerm, discount);
};
