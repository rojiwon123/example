import { AppModule } from "@/app/app.module";
import { MainConfig } from "@/common/config";
import { logger } from "@/common/logger/logger";
import { DynamicModule } from "@nestia/core";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";

const dirname = __dirname;

export const bootstrap = async (options: MainConfig) => {
    const module = await DynamicModule.mount(path.resolve(dirname + "/../controller"), { imports: [AppModule] });
    const app = await NestFactory.create(module, {
        cors: { origin: "*", credentials: false },
        logger: {
            verbose: logger("info"),
            debug: logger("info"),
            log: logger("info"),
            warn: logger("warn"),
            error: logger("error"),
            fatal: logger("fatal"),
        },
    });
    app.use(cookieParser(), helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
    await app.init();
    process.on("SIGINT", async () => {
        await app.close();
        logger()("(Main Server) Nest Application End");
        process.exit(process.exitCode);
    });
    await app.listen(options.PORT);
    logger()("(Main Server) Nest Application Start");
};
