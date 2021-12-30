const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const xBladeBond180Depository = artifacts.require("xBladeBond180Depository");

module.exports = async function (deployer, network) {
    let token = "";
    let router = "";
    let pancakeAggregator = "";
    let principle = "";
    let pancakeRouter = "";
    let treasuryAddress = "";
    let DAOAddress = "";
    if (network === "bsctestnet") {
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        router = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3"; // Pancake Router
        pancakeAggregator = "0x89db444c9542f8ea79b944be460b3efa077f5962";
        principle = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B";
        pancakeRouter = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3";
        treasuryAddress = "0x14CF6cbBede5107fDD1D99cE9eC075Cb1Fa273c8";
        DAOAddress = "0xc3ba116d38ccac8f9ccb18f20e24fcd3de2f3ea0";
    }

    if (network === "bscmainnet") {
        token = "0x27a339d9b59b21390d7209b78a839868e319301b"; // xBlade (receive token)
        pancakeAggregator = "0x33890Bf7d99b4afeD80F651Cb7dd1b12EB26597D";
        principle = "0x27a339d9b59b21390d7209b78a839868e319301b";
        pancakeRouter = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
        treasuryAddress = "0xa60fb437b969c7e2d8c5927b9dcfe9a3cb597b5b";
        DAOAddress = "0x106aFc0fCa1592F964a6e216d016b3dF45CDB4e6";
    }
    const xBladeBond = await deployProxy(
        xBladeBond180Depository,
        [
            token, // xBlade (receive token)
            principle, // Token to buy xBlade
            treasuryAddress,
            DAOAddress, // Game address to receive bonus from bond
            pancakeAggregator, // Price feed from Pancake,
            pancakeRouter,
        ],
        { deployer, initializer: "initialize", unsafeAllow: ["delegatecall"] },
    );

    const minimumTerm = "15552000"; // 45 days
    const minimumPrice = "30000000000000000"; // 0.03 USD
    const maxPayout = 28; // 0.028%
    const discount = 150; // 15%

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(minimumPrice, maxPayout, minimumTerm, discount);

    const currentSale = "30000000000000000000000";
    await xBladeBond.setCurrentSale(currentSale);
};
