import { JsonRpcProvider } from "@ethersproject/providers";
import { utils } from "ethers";

const GAS = "1"; // Add only 1 gwei with default 5 gwei

export const getGasPrice = async (provider: JsonRpcProvider) => {
    const gasPrice = await provider.getGasPrice();
    const convertGas = utils.parseUnits(GAS, "gwei");
    return gasPrice.add(convertGas);
};
