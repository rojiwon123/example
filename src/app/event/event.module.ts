import { config } from "@/common/config";
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventService } from "./event.service";
import { WorkerToken } from "./token";

@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: WorkerToken,
                useFactory: async () => ({
                    transport: Transport.REDIS,
                    options: { host: config().WORKER_HOST, port: Number(config().WORKER_PORT) },
                }),
            },
        ]),
    ],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {}
