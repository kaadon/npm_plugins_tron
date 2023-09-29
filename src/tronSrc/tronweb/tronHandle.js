import __tronWeb from "./index";
import Trc20Contract from "./Trc20Contract";

export async function getAccount(address) {
    if (!__tronWeb.isAddress(address)) throw new Error("Incorrect address format");
    return await __tronWeb.trx.getAccount(address)
}

export async function getTrx(address) {
    if (!__tronWeb.isAddress(address)) throw new Error("Incorrect address format");
    return await __tronWeb.trx.getBalance(address)
}

export async function getTrc20Contract(contract_name) {
    return await Trc20Contract((contract_name))
}


