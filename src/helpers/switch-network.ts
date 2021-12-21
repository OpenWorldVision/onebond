const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.NODE_ENV === "production" ? "0x38" : "0x61" }],
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
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [process.env.NODE_ENV === "production" ? mainnetChain : testnetChain],
    });
};

export const switchNetwork = async () => {
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
