import { EventModule } from "@/app/event/event.module";
import { InfraModule } from "@/infrastructure/infra.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [InfraModule, EventModule],
})
export class AppModule {}
