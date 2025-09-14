import { Logger } from "@logger/logger.service";
import * as nest from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";

@nest.Catch()
export class AllExceptionFilter implements nest.ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly logger: Logger,
    ) {}

    catch(exception: unknown, host: nest.ArgumentsHost) {
        const hostType = host.getType();
        if (hostType === "http") {
            const ctx = host.switchToHttp();
            const res = ctx.getResponse<Response>();
            if (this.isHttpException(exception))
                return this.httpAdapterHost.httpAdapter.reply(res, exception.message, exception.getStatus());
            this.logger.fatal("catch unknown exception", exception);
            return this.httpAdapterHost.httpAdapter.reply(res, "INTERNAL_SERVER_ERROR", 500);
        }
        if (hostType === "rpc") {
            const ctx = host.switchToRpc();
            const event = ctx.getData();
            const context = ctx.getContext();

            this.logger.error("worker error", exception, event, context);
            throw exception;
        }
    }

    isHttpException(error: unknown): error is nest.HttpException {
        const prototype = Object.getPrototypeOf(error);
        if (typeof prototype === "object" && prototype !== null) {
            const name = prototype.constructor.name;
            if (name === "HttpException") return true;
            if (name === "Error" || name === "Object") return false; // 재귀 단축
            return this.isHttpException(prototype);
        }
        return false;
    }
}
