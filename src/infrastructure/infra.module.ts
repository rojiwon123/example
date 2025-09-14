import { AllExceptionFilter } from "@/infrastructure/filter/all.exception-filter";
import { AuthGuard } from "@/infrastructure/guard/auth.guard";
import { TraceInterceptor } from "@/infrastructure/interceptor/trace.interceptor";
import { ConfigFactory } from "@config/config.factory";
import { DBModule } from "@db/db.module";
import { EventModule } from "@event/event.module";
import { LoggerModule } from "@logger/logger.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env.example"], load: [ConfigFactory] }),
        LoggerModule,
        DBModule,
        EventModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_INTERCEPTOR, useClass: TraceInterceptor },
    ],
})
export class InfraModule {}
