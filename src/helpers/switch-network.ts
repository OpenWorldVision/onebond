const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.NODE_ENV === "production" ? "0x63564c40" : "0x63564c40" }],
    });
};

const addChainRequest = () => {
    const testnetChain = {
        chainId: "0x61",
        chainName: "BSC Testnet",
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
    };
    const mainnetChain = {
        chainId: "0x38",
        chainName: "BSC Mainnet",
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com/"],
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
    };
    const harmonyMainnet = {
        chainId: "0x63564c40",
        chainName: "Harmony mainnet",
        rpcUrls: ["https://api.harmony.one"],
        blockExplorerUrls: ["https://explorer.harmony.one/"],
        nativeCurrency: {
            name: "ONE",
            symbol: "ONE",
            decimals: 18,
        },
    };
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [process.env.NODE_ENV === "production" ? harmonyMainnet : harmonyMainnet],
    });
};

export const switchNetwork = async () => {
    console.log("call day ha");
    if (window.ethereum) {
        try {
            await switchRequest();
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
                } catch (addError) {
                    console.log(error);
                }
            }
            console.log(error);
        }
    }
};
