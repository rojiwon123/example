import { AppModule } from "@/app/app.module";
import { Module } from "@nestjs/common";
import { WorkerEventConsumer } from "./worker-event.consumer";

@Module({ imports: [AppModule], controllers: [WorkerEventConsumer] })
export class WorkerModule {}
