import { DBModule } from "@/infrastructure/db/db.module";
import { AllExceptionFilter } from "@/infrastructure/filter/all.exception-filter";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

@Module({ imports: [DBModule], providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }] })
export class InfraModule {}
