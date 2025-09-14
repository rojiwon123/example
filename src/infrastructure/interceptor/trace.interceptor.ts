import { ConfigToken } from "@config/config.factory";
import { Config } from "@config/config.type";
import { Logger } from "@logger/logger.service";
import * as nest from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@nest.Injectable()
export class TraceInterceptor implements nest.NestInterceptor {
    constructor(
        @nest.Inject(ConfigToken) private readonly config: Config,
        private readonly logger: Logger,
    ) {}

    intercept(context: nest.ExecutionContext, next: nest.CallHandler): Observable<unknown> {
        const hostType = context.getType();
        if (hostType === "http") {
            const req = context.switchToHttp().getRequest<Request>();
            if (this.config.NODE_ENV === "development") this.logger.log(req.method, req.path, "has been executed");
        }
        return next.handle();
    }
}
