import { WorkerEvent } from "@event/event.type";
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { WorkerToken } from "./event.token";

@Injectable()
export class EventService implements OnModuleInit, OnModuleDestroy {
    constructor(@Inject(WorkerToken) private readonly workerClient: ClientProxy) {}

    async onModuleInit() {
        await this.workerClient.connect();
    }

    async onModuleDestroy() {
        await this.workerClient.close();
    }

    async emitWorker(input: WorkerEvent) {
        await lastValueFrom(this.workerClient.emit(input.name, input.payload));
    }
}
