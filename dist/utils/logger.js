"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config");
const createLogger = () => {
    const transports = [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        })
    ];
    if (config_1.config.nodeEnv === 'production') {
        transports.push(new winston_1.default.transports.File({
            filename: config_1.config.logFile,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json())
        }));
    }
    return winston_1.default.createLogger({
        level: config_1.config.logLevel,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
        transports
    });
};
exports.logger = createLogger();
//# sourceMappingURL=logger.js.map