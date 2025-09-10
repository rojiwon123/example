import { config } from "@/common/config";
import { logger } from "@/common/logger/logger";
import * as nest from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@nest.Injectable()
export class TraceInterceptor implements nest.NestInterceptor {
    intercept(context: nest.ExecutionContext, next: nest.CallHandler): Observable<unknown> {
        const hostType = context.getType();
        if (hostType === "http") {
            const req = context.switchToHttp().getRequest<Request>();
            if (config().NODE_ENV === "development") logger()(req.method, req.path, "has been executed");
        }
        return next.handle();
    }
}
