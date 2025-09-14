import { AppModule } from "@/app/app.module";
import { Logger } from "@logger/logger.service";
import { DynamicModule } from "@nestia/core";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import typia from "typia";

const dirname = __dirname;

export const bootstrap = async () => {
    const PORT = typia.is<number | `${number}`>(process.env["PORT"]) ? Number(process.env["PORT"]) : 4000;
    const module = await DynamicModule.mount(path.resolve(dirname + "/../controller"), { imports: [AppModule] });
    const app = await NestFactory.create(module, { cors: { origin: "*", credentials: false }, bufferLogs: true });
    app.use(cookieParser(), helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
    const logger = app.get(Logger);
    app.useLogger(logger);
    await app.init();
    process.on("SIGINT", async () => {
        await app.close();
        logger.log("(Main Server) Nest Application End");
        process.exit(process.exitCode);
    });
    await app.listen(PORT);
    logger.log("(Main Server) Nest Application Start");
};
