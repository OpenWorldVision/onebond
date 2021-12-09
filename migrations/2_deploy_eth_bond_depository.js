const TimeBondDepository = artifacts.require("TimeBondDepository");
module.exports = async function (deployer, network) {
  let router = "";
  let token = "";
  let busdAddress = "";
  let pancakeAggregator = "";
  let WETH = "";
  if (network === "bsctestnet") {
    router = "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3";
    token = "0x28ad774C41c229D48a441B280cBf7b5c5F1FED2B";
    busdAddress = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7";
    pancakeAggregator = "0x6366Fbf290Caf01E5f70d1A1b202d0855040D0C2";
    WETH = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
  }

  if (network === "bscmainnet") {
    router = "";
    token = "";
    busdAddress = "";
  }
  const xBladeBond = await deployer.deploy(
    TimeBondDepository,
    token,
    WETH,
    "0xFa3dc497e2835f53E90db15bc2B30D448f90073f",
    "0xFa3dc497e2835f53E90db15bc2B30D448f90073f",
    pancakeAggregator
  );
  const controlVariable = 1;
  const minimumTerm = "432000"; // 5 days
  const minimumPrice = "50000000000000000"; // 0.05 USD
  const maxPayout = 900; // 0.9%
  const initialDebt = 0;
  const maxDebt = "1000000000000000000000000"; // Max 1.000.000 xBlade
  // await xBladeBond.initializeBondTerms(
  //   controlVariable,
  //   minimumPrice,
  //   maxPayout,
  //   maxDebt,
  //   initialDebt,
  //   minimumTerm
  // );
};
