import __tronWeb from "./index";
import {coin} from "./enum";
import {mathHelper} from "@kaadon.com/helper";
import {add} from "@kaadon.com/helper/helper/math";

export async function getAccount(address) {
    try {
        //逻辑代码
        if (!__tronWeb.isAddress(address)) throw new Error("Incorrect address format");
        return await __tronWeb.trx.getAccount(address)
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getAddressResource =async (address) => {
    let addressData = await __tronWeb.trx.getAccountResources(address)
    if (JSON.stringify(addressData) === '{}') return Promise.resolve(false);
    let energy = 0
    let net = 0
    if (addressData?.EnergyLimit) energy = addressData.EnergyLimit - ((addressData?.EnergyUsed)?addressData.EnergyUsed:0)
    if (addressData?.NetLimit) net = (addressData.NetLimit - ((addressData?.NetUsed)?addressData.NetUsed:0))
    if (addressData?.freeNetLimit) net += (addressData.freeNetLimit - ((addressData?.freeNetUsed)?addressData.freeNetUsed:0))
    return {energy,net}
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


