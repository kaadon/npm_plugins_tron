import {getTrc20Contract} from "./tronHandle";
import {mathHelper} from "@kaadon.com/helper";

export async function getTrc20Balance(contract_name, address) {
    try {
        //逻辑代码
        let instance = await getTrc20Contract(contract_name)
        let balance = await instance.balanceOf(address).call()
        if (!balance) balance = TronWeb.BigNumber(0);
        return Promise.resolve(mathHelper.dev(balance.toNumber(), instance.symbol[contract_name].decimal))
    } catch (e) {
        return Promise.reject(e)
    }
}