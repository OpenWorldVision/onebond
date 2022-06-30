import { Networks } from "../../constants/blockchain";
import { LPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import BnbIcon from "../../assets/tokens/BNB.png";
import BusdIcon from "../../assets/tokens/BUSD.svg";
import XbladeIcon from "../../assets/tokens/XBLADE.png";
import OneIcon from "../../assets/tokens/ONE.png";

import { StableBondContract, LpBondContract, WavaxBondContract, StableReserveContract, LpReserveContract, TimeBondContract } from "../../abi";
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

export const one5y = new CustomBond({
    name: "one",
    displayName: "ONE - 5 years",
    bondToken: "ONE",
    bondIconSvg: OneIcon,
    bondContractABI: TimeBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xFB320DdB24E8Ae270E63cf881C2da19A22F90813",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
        [Networks.BSC_MAINNET]: {
            bondAddress: "0xC3d931aE489F994b54cE953cd6b71ed5D8C01b2F",
            reserveAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        },
        [Networks.HARMONY]: {
            bondAddress: "0x81a527e2f7c681be45cAaDAa8d2B4fB79264526F",
            reserveAddress: "0xc5494575709af3c6172e250A119dB59FEaE36D8b",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const one3y = new CustomBond({
    name: "one3y",
    displayName: "ONE - 3 years",
    bondToken: "ONE",
    bondIconSvg: OneIcon,
    bondContractABI: TimeBondContract,
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
            bondAddress: "0x3cd17fE894fd57649E2874417dD8f13BD6f5A0EF",
            reserveAddress: "0xc5494575709af3c6172e250A119dB59FEaE36D8b",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const one2y = new CustomBond({
    name: "one2y",
    displayName: "ONE - 2 years",
    bondToken: "ONE",
    bondIconSvg: OneIcon,
    bondContractABI: TimeBondContract,
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
            bondAddress: "0x9a0B623f8fC2A76D73D5c55b2DB8C04628CeD3D1",
            reserveAddress: "0xc5494575709af3c6172e250A119dB59FEaE36D8b",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});

export const one18m = new CustomBond({
    name: "one18m",
    displayName: "ONE - 18 months",
    bondToken: "ONE",
    bondIconSvg: OneIcon,
    bondContractABI: TimeBondContract,
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
            bondAddress: "0xFc658Da47B952223Fbf2AB0a00dCc609d07a2E32",
            reserveAddress: "0xc5494575709af3c6172e250A119dB59FEaE36D8b",
        },
        [Networks.HARMONY_TESTNET]: {
            bondAddress: "0x1e77592a14af405475c6eba853d0648E3563c1b8",
            reserveAddress: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7",
        },
    },
    tokensInStrategy: "756916000000000000000000",
});
export const one12m = new CustomBond({
    name: "one12m",
    displayName: "ONE - 12 months",
    bondToken: "ONE",
    bondIconSvg: OneIcon,
    bondContractABI: TimeBondContract,
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
            bondAddress: "0x0fe9b91992B824427EfDDDF92aF304A56E384EAF",
            reserveAddress: "0xc5494575709af3c6172e250A119dB59FEaE36D8b",
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
            bondAddress: "0x81a527e2f7c681be45cAaDAa8d2B4fB79264526F",
            reserveAddress: "0xc5494575709af3c6172e250A119dB59FEaE36D8b",
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

export default [one5y, one3y, one2y, one18m, one12m];
