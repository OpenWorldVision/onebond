import { Networks } from "../../constants/blockchain";

export enum BondType {
    StableAsset,
    LP,
}

export interface BondAddresses {
    reserveAddress: string;
    bondAddress: string;
}

export interface NetworkAddresses {
    [Networks.AVAX]: BondAddresses;
    [Networks.BSC_MAINNET]: BondAddresses;
    [Networks.HARMONY]: BondAddresses;
    [Networks.HARMONY_TESTNET]: BondAddresses;
}
