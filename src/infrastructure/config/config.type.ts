import { LogLevel } from "@logger/log-level.type";

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
