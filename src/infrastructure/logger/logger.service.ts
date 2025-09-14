import winston from "winston";

import { ConfigToken } from "@config/config.factory";
import { Config } from "@config/config.type";
import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { LogLevel } from "./log-level.type";
import { LOCAL_TRANSPORTS } from "./transport/local.transports";

@Injectable()
export class Logger implements LoggerService {
    private readonly logger: winston.Logger;
    constructor(@Inject(ConfigToken) config: Config) {
        this.logger = winston.createLogger({
            levels: { FATAL: 0, ERROR: 1, WARN: 2, INFO: 3 } satisfies Record<LogLevel, number>,
            level: config.LOG_LEVEL,
            transports: LOCAL_TRANSPORTS,
        });
    }

    private _log(level: Lowercase<LogLevel>, message: unknown[]) {
        this.logger.log(level.toUpperCase(), { message });
    }

    log(...message: unknown[]) {
        this.info(...message);
    }

    info(...msg: unknown[]) {
        this._log("info", msg);
    }

    warn(...msg: unknown[]) {
        this._log("warn", msg);
    }

    error(...msg: unknown[]) {
        this._log("error", msg);
    }

    fatal(...msg: unknown[]) {
        this._log("fatal", msg);
    }

    trace(...msg: unknown[]) {
        this.info(...msg);
    }

    verbose(...msg: unknown[]) {
        this.info(...msg);
    }

    debus(...msg: unknown[]) {
        this.info(...msg);
    }
}
