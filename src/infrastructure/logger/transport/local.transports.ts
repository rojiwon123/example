import { LogLevel } from "@logger/log-level.type";
import { isString } from "fp-ts/lib/string";
import util from "util";
import winston from "winston";

const inspectOptions = ({ level, colors }: { level: string; colors: boolean }): util.InspectOptions => {
    switch (level) {
        case "FATAL":
        case "ERROR":
        case "WARN":
            return { colors, sorted: false, depth: null };
        case "INFO":
            return { colors, sorted: false };
        case "DEBUG":
        case "TRACE":
            return {
                colors,
                sorted: false,
                depth: null,
                showHidden: true,
                showProxy: true,
                maxArrayLength: null,
                numericSeparator: true,
            };
        default:
            return { colors };
    }
};

const stringifyLogFormat = ({ colors = false }: { colors?: boolean } = {}) =>
    winston.format((info) => {
        const message: unknown = info.message;
        info.message =
            Array.isArray(message) ?
                message
                    .map((input) => (isString(input) ? input : util.inspect(input, inspectOptions({ level: info.level, colors }))))
                    .join(" ")
            : isString(message) ? message
            : util.inspect(message, inspectOptions({ level: info.level, colors }));
        return info;
    })();

export const LOCAL_TRANSPORTS = [
    new winston.transports.Stream({
        stream: process.stdout,
        format: winston.format.combine(
            stringifyLogFormat({ colors: true }),
            winston.format.colorize({
                level: true,
                colors: {
                    INFO: "green",
                    WARN: "yellow",
                    ERROR: "blue",
                    FATAL: "red",
                } satisfies Record<LogLevel, "red" | "blue" | "yellow" | "green" | "gray" | "white">,
            }),
            winston.format.printf(
                (info) => `[${info.level}] ${new Date().toLocaleString("ko", { timeZone: "Asia/Seoul" })} ${info.message}`,
            ),
        ),
    }),
];
