"use strict";
// Задание 1
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class LogerService {
    static instance;
    _logs;
    constructor() {
        console.log("Log Service");
        this._logs = [];
    }
    static getInstance() {
        if (!LogerService.instance) {
            LogerService.instance = new LogerService();
        }
        return LogerService.instance;
    }
    log(msg) {
        this._logs.push(msg);
    }
    get getLogs() {
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
const dotenv_1 = __importDefault(require("dotenv"));
class ConfigService {
    static instance;
    _config;
    constructor() {
        const cgf = dotenv_1.default.config({ path: "../.env" });
        if (cgf.error) {
            throw new Error("Not find .env file");
        }
        if (!cgf.parsed) {
            throw new Error(".env empty");
        }
        this._config = cgf.parsed;
    }
    static getInstance() {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }
    get(key) {
        const responce = this._config[key];
        if (!responce) {
            throw new Error("Not have this key");
        }
        return responce;
    }
    getNumber(key) {
        const value = this._config[key];
        console.log(typeof value);
        const responce = Number(value);
        if (Number.isNaN(responce)) {
            throw new Error("Это не число");
        }
        return responce;
    }
}
const conf = ConfigService.getInstance();
console.log(conf.getNumber("PORT"));
console.log(conf.getNumber("BOT_TOKEN"));
