export const TOKEN_DECIMALS = 9;

export enum Networks {
    AVAX = 97,
    BSC_MAINNET = 56,
}

export const DEFAULT_NETWORK = process.env.NODE_ENV === "development" ? Networks.BSC_MAINNET : Networks.AVAX;
