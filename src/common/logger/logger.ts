import winston from "winston";

import { config } from "@/common/config";
import { LogLevel } from "@/common/logger/log-level.type";
import { once } from "@/common/util/once";
import { LOCAL_TRANSPORTS } from "./transport/local.transports";

const winstonLogger = once(() =>
    winston.createLogger({
        levels: { FATAL: 0, ERROR: 1, WARN: 2, INFO: 3 } satisfies Record<LogLevel, number>,
        level: config().LOG_LEVEL,
        transports: LOCAL_TRANSPORTS,
    }),
).get;

export const logger =
    (level: Lowercase<LogLevel> = "info") =>
    (...message: unknown[]) => {
        winstonLogger().log(level.toUpperCase(), { message });
    };
