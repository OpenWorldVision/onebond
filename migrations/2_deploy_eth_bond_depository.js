const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    let router = "";
    let token = "";
    let busdAddress = "";
    let pancakeAggregator = "";
    let BUSD = "";
    if (network === "bsctestnet") {
        router = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3"; // Pancake Router
        token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B"; // xBlade (receive token)
        busdAddress = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
        pancakeAggregator = "0x723E3CCc778C48DFED46182b290b2f605eBC1889";
        BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
    }

    if (network === "bscmainnet") {
        router = "";
        token = "";
        busdAddress = "";
    }
    await deployer.deploy(
        TimeBondDepository,
        token, // xBlade (receive token)
        BUSD, // Token to buy xBlade
        "0xc3ba116d38ccac8f9ccb18f20e24fcd3de2f3ea0", // Game address to receive bonus from bond
        pancakeAggregator, // Price feed from Pancake
    );
    const xBladeBond = await TimeBondDepository.deployed();
    const controlVariable = 1;
    const minimumTerm = "432000"; // 5 days
    const minimumPrice = "50000000000000000"; // 0.05 USD
    const maxPayout = 900; // 0.9%
    const initialDebt = 0;
    const maxDebt = "1000000000000000000000000"; // Max 1.000.000 xBlade

    await xBladeBond.setBondTerms(0, minimumTerm);
    await xBladeBond.initializeBondTerms(controlVariable, minimumPrice, maxPayout, maxDebt, initialDebt, minimumTerm);
};
