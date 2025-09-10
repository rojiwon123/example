import { User } from "@/app/user/user.type";
import { config } from "@/common/config";
import { ErrorMessage } from "@/common/error/message";
import { OmitKeyof } from "@/common/util/omit.type";
import { MilliSec } from "@/common/util/time";
import { RefreshTokenEntity } from "@/entity/refresh-token.entity";
import { UserEntity } from "@/entity/user.entity";
import { MainDBToken } from "@/infrastructure/db/token";
import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { DataSource } from "typeorm";
import typia from "typia";

@Injectable()
export class AuthService {
    constructor(@Inject(MainDBToken) private readonly mainDb: DataSource) {}

    private async createTokens(user: OmitKeyof<User, "email">) {
        await this.mainDb.getRepository(RefreshTokenEntity).softDelete({ userId: user.id });
        const now = Date.now();
        const accessExp = new Date(now + MilliSec.ONE_HOUR);
        const refreshExp = new Date(now + MilliSec.ONE_DAY * 30);
        const tokenEntity = await this.mainDb
            .getRepository(RefreshTokenEntity)
            .save(this.mainDb.getRepository(RefreshTokenEntity).create({ userId: user.id, expiredAt: refreshExp }));
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    profileUrl: user.profileUrl,
                    name: user.name,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                exp: accessExp.getTime(),
                iss: "classum",
            },
            config().ACCESS_TOKEN_KEY,
        );
        const refreshToken = jwt.sign(
            { refreshTokenId: tokenEntity.id, exp: refreshExp.getTime(), iss: "classum" },
            config().REFRESH_TOKEN_KEY,
        );
        return {
            accessToken: {
                token: accessToken,
                expiredAt: accessExp.toISOString(),
            },
            refreshToken: {
                token: refreshToken,
                expiredAt: refreshExp.toISOString(),
            },
        };
    }

    private async verifyRefreshToken(refreshToken: string): Promise<{ user: User; refreshTokenId: string }> {
        try {
            const payload = jwt.verify(refreshToken, config().REFRESH_TOKEN_KEY);
            if (!typia.is<{ refreshTokenId: string; iss: "classum" }>(payload)) throw new UnauthorizedException(ErrorMessage.InvalidToken);
            const token = await this.mainDb.getRepository(RefreshTokenEntity).findOne({ where: { id: payload.refreshTokenId } });
            if (token === null) throw new UnauthorizedException(ErrorMessage.InvalidToken);
            if (Date.now() > token.expiredAt.getTime()) throw new UnauthorizedException(ErrorMessage.ExpiredToken);
            const user = await this.mainDb.getRepository(UserEntity).findOne({ where: { id: token.userId } });
            if (user === null) throw new UnauthorizedException(ErrorMessage.InvalidToken);
            return { user: user.toUser(), refreshTokenId: token.id };
        } catch (err: unknown) {
            if (err instanceof jwt.TokenExpiredError) throw new UnauthorizedException(ErrorMessage.ExpiredToken);
            if (err instanceof jwt.JsonWebTokenError) throw new UnauthorizedException(ErrorMessage.InvalidToken);
            throw err;
        }
    }

    async signUp(input: Pick<UserEntity, "email" | "password" | "profileUrl" | "firstName" | "lastName">) {
        const { affectedRows = 0 } = await this.mainDb.query<{ affectedRows?: number }>(
            `
            INSERT INTO users (email, password, profileUrl, firstName, lastName)
            SELECT ?, ?, ?, ?, ?
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = ?)
            `,
            [input.email, input.password, input.profileUrl, input.firstName, input.lastName, input.email],
        );
        if (affectedRows < 1) throw new ConflictException("이미 사용 중인 이메일입니다.");
    }

    async signIn(input: Pick<UserEntity, "email" | "password">) {
        const entity = await this.mainDb.getRepository(UserEntity).findOne({ where: { email: input.email } });
        if (entity === null) throw new NotFoundException(ErrorMessage.NotFoundUser);
        if (!(await this.verifyPassword(entity, input.password))) throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");
        return this.createTokens(entity.toUser());
    }

    async refresh(refreshToken: string) {
        const { user } = await this.verifyRefreshToken(refreshToken);
        return this.createTokens(user);
    }

    async signOut(refreshToken: string) {
        const { refreshTokenId } = await this.verifyRefreshToken(refreshToken);
        await this.mainDb.getRepository(RefreshTokenEntity).softDelete({ id: refreshTokenId });
    }

    async verifyPassword(user: Pick<UserEntity, "password">, password: string) {
        return user.password === password;
    }
}
