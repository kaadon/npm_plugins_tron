import TronWeb from "tronweb";

class tronWebClass {
    static instance;
    tron
    static getInstance(config = null){
        if (!this.instance) {
            this.instance = (new tronWebClass(config)).tron;
        }
        return this.instance;
    }

    constructor(config = null) {
        if (!config) {
            let configENV = process.env?.TRON
            if (!configENV) throw new Error("ENV  TRON配置不存在");
            const tronArr = JSON.parse(configENV)
            const apikeys = tronArr?.APIKEYS
            if (!apikeys) throw new Error("TRON.APIKEYS 不存在");
            let apikey
            if (Array.isArray(apikeys)) {
                 apikey = apikeys[Math.floor(Math.random() * apikeys.length)]
            } else if (typeof apikeys === "string") {
                 apikey = apikeys[Math.floor(Math.random() * apikeys.length)]
            } else {
                throw new Error("tron APIKEYS 配置只能是数组");
            }
            let privateKey = tronArr?.PRIVATEKEY
            if (!privateKey && typeof privateKey !== "string") throw new Error("TRON.PRIVATEKEY 不存在或者格式配置错误");
            config = {
                apikey: apikey,
                privateKey: privateKey
            }
        }
        this.tron = new TronWeb({
            fullHost: 'https://api.trongrid.io',
            headers: {'TRON-PRO-API-KEY': config.apikey},
            privateKey: config.privateKey
        })
    }
}

export default tronWebClass.getInstance()
