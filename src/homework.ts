// Задание 1

class LogerService {
    private static instance: LogerService;
    private _logs: string[];
    private constructor() {
        console.log("Log Service");
        this._logs = [];
    }
    public static getInstance() {
        if(!LogerService.instance) {
            LogerService.instance = new LogerService();
        }
        return LogerService.instance;
    }
    public log(msg: string) {
        this._logs.push(msg);
    }
    public get getLogs() {
        return [...this._logs];
    }

}

// const logger = new LogerService(); ошибка
const log1 = LogerService.getInstance();
log1.log("Date: 01.03.26 Time: 12:00");
log1.log("Date: 02.03.26 Time: 14:00");
console.log(log1.getLogs);


const log2 = LogerService.getInstance();
console.log(log2.getLogs);


// Задание 2

import dotenv from "dotenv";

class ConfigService {
    private static instance: ConfigService;

    private _config: dotenv.DotenvParseOutput;
    private constructor() {
        const cgf = dotenv.config({path:"../.env"});
        if(cgf.error) {
            throw new Error("Not find .env file")
        }
        if(!cgf.parsed) {
            throw new Error(".env empty")
        }
        this._config = cgf.parsed;
    }
    
    public static getInstance(): ConfigService {
            if(!ConfigService.instance) {
                ConfigService.instance = new ConfigService();
            }
            return ConfigService.instance;
        }

    public get(key: string) {
        const responce = this._config[key];
        if(!responce) {
            throw new Error("Not have this key");
        }
        return responce;
    }

    public getNumber(key: string): number {
        const value = this._config[key];
        console.log(typeof value);
        const responce = Number(value);
        if(Number.isNaN(responce)) {
            throw new Error("Это не число")
        }

        return responce;
    }
}

const conf = ConfigService.getInstance();
console.log(conf.getNumber("PORT"));
console.log(conf.getNumber("BOT_TOKEN"));