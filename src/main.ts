import { config } from "@/common/config";
import { logger } from "@/common/logger/logger";
import { bootstrap } from "./bootstrap";

export const main = async () => {
    const env = config();
    try {
        if (env.MODE === "main") await bootstrap.main(env);
        if (env.MODE === "worker") await bootstrap.worker();
    } catch (error: unknown) {
        logger("fatal")("fail to bootstrap", error);
        throw error;
    }
};

void main();
