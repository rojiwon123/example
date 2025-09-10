import { WorkerEvent } from "@/common/event/event";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class UserConsumer {
    @EventPattern(WorkerEvent.UserCreated)
    async created(@Payload() payload: WorkerEvent.UserCreated) {
        console.log("created", payload);
    }

    @EventPattern(WorkerEvent.UserUpdated)
    async updated(@Payload() payload: WorkerEvent.UserUpdated) {
        console.log("updated", payload);
    }
}
