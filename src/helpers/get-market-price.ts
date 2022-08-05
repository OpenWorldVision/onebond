import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { xbladeBUSD } from "../helpers/bond";
import { Networks } from "../constants/blockchain";
import axios from "axios";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const result = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=cryptowar-xblade&vs_currencies=usd");
    if (result.data["cryptowar-xblade"]?.usd) {
        return 1 / result.data["cryptowar-xblade"]?.usd;
    }
    return 0;
    // const mimTimeAddress = xbladeBUSD.getAddressForReserve(networkID);
    // const pairContract = new ethers.Contract(mimTimeAddress, LpReserveContract, provider);
    // const reserves = await pairContract.getReserves();
    // const marketPrice = reserves[0] / reserves[1];
    // return marketPrice;
}
