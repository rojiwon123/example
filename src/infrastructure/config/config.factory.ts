import { registerAs } from "@nestjs/config";
import typia from "typia";
import { Config } from "./config.type";

export const ConfigFactory = registerAs(Symbol("Config"), () =>
    typia.assert<Config>({ LOG_LEVEL: "INFO", PORT: 4000, ...process.env } satisfies Partial<Config>),
);
export const ConfigToken = ConfigFactory.KEY;
