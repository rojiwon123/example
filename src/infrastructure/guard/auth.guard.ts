import { User } from "@/app/user/user.type";
import { config } from "@/common/config";
import { IS_PUBLIC_KEY } from "@/common/decorator/is-public.decorator";
import { ErrorMessage } from "@/common/error/message";
import { UserEntity } from "@/entity/user.entity";
import { MainDBToken } from "@/infrastructure/db/token";
import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { DataSource } from "typeorm";
import typia from "typia";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(MainDBToken) private readonly mainDb: DataSource,
    ) {}

    private async verifyAccessToken(accessToken: string): Promise<User> {
        try {
            const payload = jwt.verify(accessToken, config().ACCESS_TOKEN_KEY);
            if (!typia.is<{ user: Pick<User, "id"> }>(payload)) throw new UnauthorizedException(ErrorMessage.InvalidToken);

            const user = await this.mainDb.getRepository(UserEntity).findOne({ where: { id: payload.user.id } });
            if (user === null || user.status !== "active") throw new UnauthorizedException(ErrorMessage.InvalidToken);
            return user.toUser();
        } catch (err: unknown) {
            if (err instanceof jwt.TokenExpiredError) throw new UnauthorizedException(ErrorMessage.ExpiredToken);
            if (err instanceof jwt.JsonWebTokenError) throw new UnauthorizedException(ErrorMessage.InvalidToken);
            throw err;
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;
        const hostType = context.getType();
        if (hostType === "rpc") return true;
        if (hostType === "http") {
            const request = context.switchToHttp().getRequest<Request>();
            const [_, token] = request.headers.authorization?.split(" ") ?? [];
            if (typeof token !== "string") throw new ForbiddenException("비회원은 이용할 수 없습니다.");
            request.user = await this.verifyAccessToken(token);
            return true;
        }
        return false;
    }
}
