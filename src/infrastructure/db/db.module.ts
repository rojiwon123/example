import { config } from "@/common/config";
import { Global, Module } from "@nestjs/common";
import path from "path";
import { DataSource } from "typeorm";
import { MainDBToken } from "./token";

@Global()
@Module({
    providers: [
        {
            provide: MainDBToken,
            useFactory: () => {
                const { DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = config();
                return new DataSource({
                    type: "mysql",
                    host: DB_HOST,
                    port: Number(DB_PORT),
                    username: DB_USERNAME,
                    password: DB_PASSWORD,
                    database: "main",
                    entities: [path.resolve(__dirname + "/../../entity/**/*.entity{.ts,.js}")],
                    synchronize: true,
                }).initialize();
            },
        },
    ],
    exports: [MainDBToken],
})
export class DBModule {}
