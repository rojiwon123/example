import { WorkerEvent } from "@event/event.type";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class WorkerEventConsumer {
    @EventPattern(WorkerEvent.UserCreated)
    async created(@Payload() payload: WorkerEvent.UserCreated) {
        console.log("created", payload);
    }

    @EventPattern(WorkerEvent.UserUpdated)
    async updated(@Payload() payload: WorkerEvent.UserUpdated) {
        console.log("updated", payload);
    }
}
