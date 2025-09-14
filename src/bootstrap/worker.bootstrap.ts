import { MilliSec } from "@/common/util/time";
import { WorkerModule } from "@/consumer/worker.module";
import { ConfigToken } from "@config/config.factory";
import { Config } from "@config/config.type";
import { Logger } from "@logger/logger.service";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export const bootstrap = async () => {
    const app = await NestFactory.create(WorkerModule, { bufferLogs: true });
    const config = app.get<Config>(ConfigToken);
    const logger = app.get(Logger);
    app.useLogger(logger);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.REDIS,
        options: {
            host: config.WORKER_HOST,
            port: Number(config.WORKER_PORT),
            retryAttempts: Infinity,
            retryDelay: MilliSec.ONE_SEC * 5,
        },
    });
    await app.startAllMicroservices();
    process.on("SIGINT", async () => {
        await app.close();
        logger.log("(Worker Server) Nest Application End");
        process.exit(process.exitCode);
    });
    await app.init();
    logger.log("(Worker Server) Nest Application Start");
};
