import { EventService } from "@/app/event/event.service";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("system")
export class SystemController {
    constructor(private readonly eventClient: EventService) {}

    @core.TypedRoute.Get("health")
    async health(): Promise<"health check"> {
        await this.eventClient.emitWorker({ name: "user.created", payload: { userId: "3" } });
        return "health check";
    }
}
