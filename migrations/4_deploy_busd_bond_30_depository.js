const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const XBladeBond30Depository = artifacts.require("XBladeBond30Depository");

module.exports = async function (deployer, network) {
    let token = "";
    let router = "";
    let pancakeAggregator = "";
    let BUSD = "";
    let pancakeRouter = "";
    let treasuryAddress = "";
    let DAOAddress = "";
    let BNBAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
    if (network === "bsctestnet") {
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        router = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3"; // Pancake Router
        pancakeAggregator = "0x89db444c9542f8ea79b944be460b3efa077f5962";
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
        XBladeBond30Depository,
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

    // const xBladeBond = await XBladeBond30Depository.at("0x050ecA1D00ff0cf565796a393d5152886fe9D272");

    const minimumTerm = "2592000"; // 30 days
    const minimumPrice = "25000000000000000"; // 0.025 USD
    const maxPayout = 28; // 0.028%
    const discount = 250; // 25%

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(minimumPrice, maxPayout, minimumTerm, discount);

    const currentSale = "28000000000000000000000";
    await xBladeBond.setCurrentSale(currentSale);
};
