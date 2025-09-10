import { WorkerEvent } from "@/common/event/event";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { WorkerToken } from "./token";

@Injectable()
export class EventService {
    constructor(@Inject(WorkerToken) private readonly workerClient: ClientProxy) {}

    async emitWorker(input: WorkerEvent) {
        return this.workerClient.emit(input.name, input.payload);
    }
}
