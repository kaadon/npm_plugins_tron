import __tronWeb from "./index";
import Trc20Contract from "./Trc20Contract";
import {coin} from "./enum";
import {mathHelper} from "@kaadon.com/helper";

export async function getAccount(address) {
    try {
        //逻辑代码
        if (!__tronWeb.isAddress(address)) throw new Error("Incorrect address format");
        return await __tronWeb.trx.getAccount(address)
    } catch (e) {
        return Promise.reject(e)
    }
}

export async function getTrx(address) {
    try {
        //逻辑代码
        if (!__tronWeb.isAddress(address)) throw new Error("Incorrect address format");
        let balance = await __tronWeb.trx.getBalance(address)
        return Promise.resolve(mathHelper.dev(balance,1000000))
    } catch (e) {
        return Promise.reject(e)
    }
}

export async function getTrc20Contract(contract_name) {
    try {
        let symbol = coin.find(item => item.name === contract_name)
        if (!symbol) throw new Error("contract_name is not supported");
        //逻辑代码
        let contract = await __tronWeb.contract().at(symbol.address)
        contract.symbol = {
            [symbol.name]: symbol
        }
        return Promise.resolve(contract)
    } catch (e) {
        return Promise.reject(e)
    }
}


