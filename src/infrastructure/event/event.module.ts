import { MilliSec } from "@/common/util/time";
import { ConfigToken } from "@config/config.factory";
import { Config } from "@config/config.type";
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventService } from "./event.service";
import { WorkerToken } from "./event.token";

@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: WorkerToken,
                inject: [ConfigToken],
                useFactory: async ({ WORKER_HOST, WORKER_PORT }: Config) => ({
                    transport: Transport.REDIS,
                    options: {
                        host: WORKER_HOST,
                        port: Number(WORKER_PORT),
                        retryAttempts: Infinity,
                        retryDelay: MilliSec.ONE_SEC * 5,
                    },
                }),
            },
        ]),
    ],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {}
