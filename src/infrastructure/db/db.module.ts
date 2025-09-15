import { ConfigToken } from "@config/config.factory";
import { Config } from "@config/config.type";
import { Global, Module } from "@nestjs/common";
import path from "path";
import { DataSource } from "typeorm";
import { MainDBToken } from "./db.token";

@Global()
@Module({
    providers: [
        {
            provide: MainDBToken,
            inject: [ConfigToken],
            useFactory: ({ DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, MODE }: Config) => {
                return new DataSource({
                    type: "mysql",
                    host: DB_HOST,
                    port: Number(DB_PORT),
                    username: DB_USERNAME,
                    password: DB_PASSWORD,
                    database: "main",
                    entities: [path.resolve(__dirname + "/../../entity/**/*.entity{.ts,.js}")],
                    synchronize: MODE === "main",
                }).initialize();
            },
        },
    ],
    exports: [MainDBToken],
})
export class DBModule {}
