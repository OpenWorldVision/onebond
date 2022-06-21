const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let token = "";

    let pancakeAggregator = "";
    let BUSD = "";
    let pancakeRouter = "";
    let treasuryAddress = "";
    let DAOAddress = "";
    let BNBAddress = "";
    if (network === "bsctestnet") {
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        pancakeAggregator = "0xE739a067989dB4B065159aa3d5C5e440e7C19fD1";
        BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
        pancakeRouter = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3";
        treasuryAddress = "0x14CF6cbBede5107fDD1D99cE9eC075Cb1Fa273c8";
        DAOAddress = "0xc3ba116d38ccac8f9ccb18f20e24fcd3de2f3ea0";
        BNBAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
    }

    if (network === "bscmainnet") {
        token = "0x27a339d9b59b21390d7209b78a839868e319301b"; // xBlade (receive token)
        pancakeAggregator = "0x33890Bf7d99b4afeD80F651Cb7dd1b12EB26597D";
        BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
        pancakeRouter = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
        treasuryAddress = "0xa60fb437b969c7e2d8c5927b9dcfe9a3cb597b5b";
        DAOAddress = "0x106aFc0fCa1592F964a6e216d016b3dF45CDB4e6";
    }
    const xBladeBond = await deployProxy(
        TimeBondDepository,
        [
            token, // xBlade (receive token)
            BUSD, // Token to buy xBlade
            treasuryAddress,
            DAOAddress, // Game address to receive bonus from bond
            pancakeAggregator, // Price feed from Pancake,
            pancakeRouter,
            BNBAddress,
        ],
        { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    );

    const minimumTerm = "157680000"; // 7 days
    const minimumPrice = "10000000000000000"; // 0.025 USD
    const maxPayout = 50; // 0.028%
    const discount = 125; // 12.5%

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(minimumPrice, maxPayout, minimumTerm, discount);

    const currentSale = "150000000000000000000000"; // 28000 xBlade
    await xBladeBond.setCurrentSale(currentSale);
};
