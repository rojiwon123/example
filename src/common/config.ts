import { LogLevel } from "@/common/logger/log-level.type";
import { once } from "@/common/util/once";
import dotenv from "dotenv";
import typia from "typia";

export interface MainConfig {
    MODE: "main";
    /** @default 4000 */
    PORT: number | `${number}`;
}

export interface WorkerConfig {
    MODE: "worker";
}

export type Config = {
    NODE_ENV: "development" | "production";

    WORKER_HOST: string;
    WORKER_PORT: number | `${number}`;

    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;

    LOG_LEVEL: LogLevel;

    ACCESS_TOKEN_KEY: string;
    REFRESH_TOKEN_KEY: string;
} & (MainConfig | WorkerConfig);

const validateConfig = typia.createAssert<Config>();

const _config = once((): Readonly<Config> => {
    switch (process.env["NODE_ENV"]) {
        case "development":
            dotenv.config({ path: ".env.dev", override: true });
            break;
        case "production":
            break;
        default:
            throw Error("NODE_ENV should be one of (development|production)");
    }
    return validateConfig({ PORT: 4000, WORKER_PORT: 3001, LOG_LEVEL: "INFO", ...process.env } satisfies Partial<Config>);
});

export const config = _config.get;
