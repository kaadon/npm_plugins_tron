import {getTrc20Contract} from "./tronHandle";
import coin from "./enum/coin";

export async function getTrc20Balance(contract_name, address) {
    let instance = await getTrc20Contract(coin[contract_name])
    return await instance.balanceOf(address).call()
}

