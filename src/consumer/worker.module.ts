import { AppModule } from "@/app/app.module";
import { UserConsumer } from "@/consumer/user.consumer";
import { Module } from "@nestjs/common";

@Module({
    imports: [AppModule],
    controllers: [UserConsumer],
})
export class WorkerModule {}
