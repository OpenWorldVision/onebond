export const TOKEN_DECIMALS = 9;

export enum Networks {
    AVAX = 97,
    BSC_MAINNET = 56,
}

console.log("hshaha", process.env.NODE_ENV);

export const DEFAULT_NETWORK = process.env.NODE_ENV === "production" ? Networks.BSC_MAINNET : Networks.AVAX;
