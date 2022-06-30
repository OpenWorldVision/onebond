const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let token = "";

    let pancakeRouter = ""; // Pancake Router in BSC, Sushi Router in Harmony
    let principle = ""; // WBNB in BSC, WONE in Harmony
    let treasuryAddress = "";
    let DAOAddress = "";
    let usd = ""; // BUSD in BSC, FRAX in Harmony
    if (network === "bsctestnet") {
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        principle = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
        pancakeRouter = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3";
        treasuryAddress = "0x14CF6cbBede5107fDD1D99cE9eC075Cb1Fa273c8";
        DAOAddress = "0xc3ba116d38ccac8f9ccb18f20e24fcd3de2f3ea0";
        usd = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
    }

    if (network === "bscmainnet") {
        token = "0x27a339d9b59b21390d7209b78a839868e319301b"; // xBlade (receive token)
        principle = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
        pancakeRouter = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
        treasuryAddress = "0xa60fb437b969c7e2d8c5927b9dcfe9a3cb597b5b";
        DAOAddress = "0x106aFc0fCa1592F964a6e216d016b3dF45CDB4e6";
        usd = "";
    }

    if (network === "harmony") {
        token = "0x27a339d9b59b21390d7209b78a839868e319301b"; // OPEN (receive token)
        principle = "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a"; // WONE
        pancakeRouter = "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506"; // SushiRouter
        treasuryAddress = "0xa60fb437b969c7e2d8c5927b9dcfe9a3cb597b5b";
        DAOAddress = "0x106aFc0fCa1592F964a6e216d016b3dF45CDB4e6";
        usd = "0xFa7191D292d5633f702B0bd7E3E3BcCC0e633200"; // FRAX, a stable token
    }
    const xBladeBond = await deployProxy(
        TimeBondDepository,
        [
            token, // OPEN (receive token)
            principle, // Token to buy OPEN
            treasuryAddress,
            DAOAddress, // Game address to receive bonus from bond
            pancakeRouter,
            usd,
        ],
        { deployer, initializer: "initialize", unsafeAllow: ["struct-definition", "enum-definition", "delegatecall"] },
    );

    const minimumTerm = "63072000"; // 2 years
    const minimumPrice = "30000000000000000"; // 0.03
    const maxPayout = 50; // 0.028%
    const discount = 125; // 12.5%

    //re-deploy

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(minimumPrice, maxPayout, minimumTerm, discount);

    const currentSale = "500000000000000000000000"; // 500000 OPEN
    await xBladeBond.setCurrentSale(currentSale);
};
