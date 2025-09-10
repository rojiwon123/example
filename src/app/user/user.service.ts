import { User } from "@/app/user/user.type";
import { ErrorMessage } from "@/common/error/message";
import { UserEntity } from "@/entity/user.entity";
import { MainDBToken } from "@/infrastructure/db/token";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class UserService {
    constructor(@Inject(MainDBToken) private readonly mainDb: DataSource) {}

    async getUser(input: { userId: string }): Promise<User> {
        const user = await this.mainDb.getRepository(UserEntity).findOne({ where: { id: input.userId } });
        if (user === null) throw new NotFoundException(ErrorMessage.NotFoundUser);
        return user.toUser();
    }

    async upadateUser(viewer: User, input: Pick<User, "name" | "profileUrl">) {
        await this.mainDb
            .getRepository(UserEntity)
            .update({ id: viewer.id }, { firstName: input.name.first, lastName: input.name.last, profileUrl: input.profileUrl });
    }
}
