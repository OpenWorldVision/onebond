export const TOKEN_DECIMALS = 9;

export enum Networks {
    AVAX = 97,
    BSC_MAINNET = 56,
    HARMONY_TESTNET = 1666700000,
    HARMONY = 1666600000,
}
//set default testnet for test

export const DEFAULT_NETWORK = process.env.NODE_ENV === "production" ? Networks.AVAX : Networks.AVAX;
