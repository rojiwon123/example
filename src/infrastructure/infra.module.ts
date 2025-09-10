import { DBModule } from "@/infrastructure/db/db.module";
import { AllExceptionFilter } from "@/infrastructure/filter/all.exception-filter";
import { AuthGuard } from "@/infrastructure/guard/auth.guard";
import { TraceInterceptor } from "@/infrastructure/interceptor/trace.interceptor";
import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [DBModule],
    providers: [
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_INTERCEPTOR, useClass: TraceInterceptor },
    ],
})
export class InfraModule {}
