import { ErrorMessage } from "@/common/error/message";
import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export const Viewer = () =>
    createParamDecorator((_: undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const user = request.user;
        if (user) return user;
        throw new UnauthorizedException(ErrorMessage.NotFoundUser);
    })();
