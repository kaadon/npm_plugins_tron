import coin from "./enum/coin";
import __tronWeb from "./index";

class Trc20Contract {
    static instance
    symbol
    decimals
    contract

    static getInstance(contract_name) {
        if (!Trc20Contract.instance) {
            Trc20Contract.instance = new Trc20Contract(contract_name)
        }
        return Trc20Contract.instance
    }

    constructor(contract_name) {
        this.symbol = contract_name
        if (!coin?.[contract_name]) throw new Error("contract_name is not supported");
    }

    async getContract() {
        if (!this.contract) this.contract = await __tronWeb.contract().at(this.symbol)
        this.decimals = await this.contract.decimals().call()
        return this.contract
    }

    _toNumber(balanceOf) {

    }

}

export default async (contract_name) => {
    let contract = Trc20Contract.getInstance(contract_name)
    await contract.getContract()
    return contract
}