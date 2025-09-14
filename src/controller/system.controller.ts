import { IsPublic } from "@/common/decorator/is-public.decorator";
import { EventService } from "@/infrastructure/event/event.service";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@IsPublic()
@Controller("system")
export class SystemController {
    constructor(private readonly eventClient: EventService) {}

    /**
     * @summary health check
     * @tag system
     */
    @core.TypedRoute.Get("health")
    async health(): Promise<"health check"> {
        await this.eventClient.emitWorker({ name: "user.created", payload: { userId: "3" } });
        return "health check";
    }
}
