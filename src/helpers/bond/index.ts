import { Networks } from "../../constants/blockchain";
import { LPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import BnbIcon from "../../assets/tokens/BNB.png";
import BusdIcon from "../../assets/tokens/BUSD.svg";
import XbladeIcon from "../../assets/tokens/XBLADE.png";

import { StableBondContract, LpBondContract, WavaxBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const bnb = new StableBond({
    name: "bnb",
    displayName: "BNB",
    bondToken: "BNB",
    bondIconSvg: BnbIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "60500000000000000000000000",
});

export const xbn = new CustomBond({
    name: "xbn",
    displayName: "XBN",
    bondToken: "XBN",
    bondIconSvg: AvaxIcon,
    bondContractABI: WavaxBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const busd = new CustomBond({
    name: "busd",
    displayName: "BUSD - 5 years",
    bondToken: "BUSD",
    bondIconSvg: BusdIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xf6C4491f5d06d73e48e0a50833a5cDf218729C6c",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0xC3d931aE489F994b54cE953cd6b71ed5D8C01b2F",
            reserveAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const busd30 = new CustomBond({
    name: "busd-50",
    displayName: "BUSD - 55 days",
    bondToken: "BUSD",
    bondIconSvg: BusdIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0x7Fe98bf70cFF52903634Ea7Dfe8B44F99bB3019C",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x050ecA1D00ff0cf565796a393d5152886fe9D272",
            reserveAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const busd45 = new CustomBond({
    name: "busd-45",
    displayName: "BUSD - 45 days",
    bondToken: "BUSD",
    bondIconSvg: BusdIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xffFF6347040CA37A5E6D17C07705325C69A63D7B",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x1406Ca4E936fF6C2E5E9Cf6a13F19A7048d9B09e",
            reserveAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const xblade = new CustomBond({
    name: "xblade-200",
    displayName: "OPEN - 260 days",
    bondToken: "xBlade",
    bondIconSvg: XbladeIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0x0504fc7eA78f3EF1Ac2a1b06A92b61111f7b5F2A",
            reserveAddress: "0x28ad774c41c229d48a441b280cbf7b5c5f1fed2b",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x80EB989BB8D2735fA329797503476aCee6c4EAB2",
            reserveAddress: "0x27a339d9B59b21390d7209b78a839868E319301B",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const xbladeBUSD = new LPBond({
    name: "mim_time_lp",
    displayName: "TIME-MIM LP",
    bondToken: "MIM",
    bondIconSvg: MimTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78b5157aff2b08a4b4cee16f1e8b801515ae529a",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x0d352ea95cdb52294742a32123f50be474163038",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/0x130966628846BFd36ff31a822705796e8cb8C18D/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});

// export const avaxTime = new CustomLPBond({
//     name: "avax_time_lp",
//     displayName: "TIME-AVAX LP",
//     bondToken: "AVAX",
//     bondIconSvg: AvaxTimeIcon,
//     bondContractABI: LpBondContract,
//     reserveContractAbi: LpReserveContract,
//     networkAddrs: {
//         [Networks.AVAX]: {
//             bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
//             reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
//         },
//     },
//     lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
// });

export default [busd];
