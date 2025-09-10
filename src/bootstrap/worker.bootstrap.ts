import { config } from "@/common/config";
import { logger } from "@/common/logger/logger";
import { WorkerModule } from "@/consumer/worker.module";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export const bootstrap = async () => {
    const app = await NestFactory.create(WorkerModule, {
        logger: {
            verbose: logger("info"),
            debug: logger("info"),
            log: logger("info"),
            warn: logger("warn"),
            error: logger("error"),
            fatal: logger("fatal"),
        },
    });
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.REDIS,
        options: {
            host: config().WORKER_HOST,
            port: Number(config().WORKER_PORT),
        },
    });
    await app.startAllMicroservices();
    process.on("SIGINT", async () => {
        await app.close();
        logger()("(Worker Server) Nest Application End");
        process.exit(process.exitCode);
    });
    await app.init();
    logger()("(Worker Server) Nest Application Start");
};
