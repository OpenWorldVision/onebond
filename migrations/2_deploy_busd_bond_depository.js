const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let router = "";
    let token = "";
    let busdAddress = "";
    let pancakeAggregator = "";
    let BUSD = "";
    let pancakeRouter = "";
    let treasuryAddress = "";
    if (network === "bsctestnet") {
        router = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3"; // Pancake Router
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        busdAddress = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
        pancakeAggregator = "0x89db444c9542f8ea79b944be460b3efa077f5962";
        BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
        pancakeRouter = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3";
        treasuryAddress = "0x14CF6cbBede5107fDD1D99cE9eC075Cb1Fa273c8";
    }

    if (network === "bscmainnet") {
        router = "";
        token = "";
        busdAddress = "";
    }
    const xBladeBond = await deployProxy(
        TimeBondDepository,
        [
            token, // xBlade (receive token)
            BUSD, // Token to buy xBlade
            treasuryAddress,
            "0xc3ba116d38ccac8f9ccb18f20e24fcd3de2f3ea0", // Game address to receive bonus from bond
            pancakeAggregator, // Price feed from Pancake,
            pancakeRouter,
        ],
        { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    );

    const minimumTerm = "604800"; // 7 days
    const minimumPrice = "25000000000000000"; // 0.025 USD
    const maxPayout = 28; // 0.028%
    const discount = 125; // 12.5%

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(minimumPrice, maxPayout, minimumTerm, discount);

    const currentSale = "28000000000000000000000";
    await xBladeBond.setCurrentSale(currentSale);
};
