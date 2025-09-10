import { EventModule } from "@/app/event/event.module";
import { InfraModule } from "@/infrastructure/infra.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

const modules = [InfraModule, EventModule, AuthModule];

@Module({ imports: modules, exports: modules })
export class AppModule {}
